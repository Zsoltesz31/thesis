import React,{useEffect, useState} from 'react'
import axios from 'axios'
import {View,Text,SafeAreaView,FlatList,Pressable,Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import {testListStyle} from'./style'
import { deleteTest, getTestById } from '../../slices/testSlice';
import { useDispatch, } from 'react-redux';
import { ConfirmationModal } from '../modals/confirmation_modal';
import { CustomButton } from '../buttons/buttons';





export default function TestList({navigation,courseId,data,changeListener,listType}){
    const dispatch = useDispatch()
    const [isModalVisible,setIsModalVisible] = useState(false)
    const modalClose = () =>{
        setIsModalVisible(false)
    }

    const handleDelete = (id) =>{
        console.log(id)
        dispatch(deleteTest(id)).then(changeListener(true))
        modalClose()
    }

    const CheckDate = (date,title,id) =>{
        console.log(title)
        let today = new Date()
        if(date!=today){
            Alert.alert(
                "Nem kezdheti el a tesztet!",
                "A teszt időpontja nem egyezik meg a mai dátummal így nem kezdheti el a tesztet",
                [
                  {
                    text: "Rendben",
                    style: "cancel",
                  },
                ])
        }
        else{

            navigation.navigate('TestSheet',{testname:title,testId:id,listType:listType})
        }
    }

     const passTestDataById = async (id) =>{
        return await axios.get(`http://192.168.1.64:3333/test/${id}`).
        then((response)=>{
            let selectedTest = response.data.data
            console.log(selectedTest)
            navigation.navigate('CreateTest',{edit:true,testData:selectedTest})
        }
        )
    }

    const onDeleteButtonPress = (id) => {
        Alert.alert(
            'Figyelmeztetés',
          "Biztosan törli a tesztet?",
          [
            {
              text: "Igen",
              style: "destructive",
              onPress: () => handleDelete(id),
            },
            {
              text: "Nem",
              style: "cancel",
            },
          ]
        );
      };

    const Item = ({item}) => (
        <Pressable onPress={()=>{navigation.navigate('TestSheet',{testname:item.title,testId:item.id,listType:listType})}} android_ripple="true">
        <View style={testListStyle.listitem}>
        <Text style={testListStyle.listItemHeader}>{item.title}</Text>
        <View style={testListStyle.listCrudButtons}>
        <Pressable onPress={()=>passTestDataById(item.id)}><Ionicons name={'create-outline'} size={20} color={"white"}/></Pressable>
        <Pressable onPress={()=>onDeleteButtonPress(item.id)}><Ionicons name={'trash-outline'} size={20} color={"white"}/></Pressable>
        </View>
        <View style={testListStyle.testFooterContainer}>
        </View>
        </View>
        <ConfirmationModal visible={isModalVisible} onClose={modalClose}>
                <View style={testListStyle.modalContent}>
                <Text style={testListStyle.modalTitle}>Biztosan törli ezt a tesztet?</Text>
                <CustomButton buttonName={'Igen'} onPress={()=>(console.log(item.title))}></CustomButton>
                <CustomButton buttonName={'Nem'} onPress={()=>(modalClose())}></CustomButton>
                </View>
        </ConfirmationModal>
        </Pressable>
        
    )

    const PublishedItem = ({item,date,actualDate}) =>(
        <Pressable onPress={()=>CheckDate(actualDate,item.title,item.id)} android_ripple="true">
        <View style={testListStyle.listitem}>
        <Text style={testListStyle.listItemHeader}>Teszt neve: elso{item.testName}</Text>
        <Text style={testListStyle.listItemHeader}>Teszt leírása: elso{item.description}</Text>
        <View style={testListStyle.testFooterContainer}>
        <Text style={testListStyle.deadline}>Kezdés időpontja: {date}</Text>
        </View>
        </View>
        </Pressable>
    )
    
    const renderItem=({item}) =>{
        if(listType=='Tests')
        return(
            <Item
            item={item}
            />
           
        )
        else if(listType=='upComingTests'){
            let date = new Date(item.startDate)
            return(
                <PublishedItem
                item={item}
                date={date.getFullYear() + '-' + (date.getMonth()+1<10 ? ('0' + (date.getMonth()+1)) : date.getMonth()+1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()}
                actualDate={date}
                />
            )
        }
    }
    return(
          <SafeAreaView style={testListStyle.container}>
            <FlatList
            showsHorizontalScrollIndicator={false}
            data={data.data}
            renderItem={renderItem}
            keyExtractor = {item=>item.id.toString()}
            ></FlatList>
          </SafeAreaView>  
        
    )
    
}