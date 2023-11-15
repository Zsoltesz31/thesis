import React,{useEffect, useState} from 'react'
import axios from 'axios'
import {View,Text,SafeAreaView,FlatList,Pressable,Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import {testListStyle} from'./style'
import { deleteTest, getTestById } from '../../slices/testSlice';
import { useDispatch, } from 'react-redux';
import { ConfirmationModal } from '../modals/confirmation_modal';
import { CustomButton } from '../buttons/buttons';
import BaseInstance from '../../api/api';
import { getTeacherFilledTestsGroupedByUpcomingTest } from '../../slices/fillTestSlice';





export default function TestList({navigation,courseId,data,changeListener,listType,c}){
  console.log(c)
    const dispatch = useDispatch()
    const [isModalVisible,setIsModalVisible] = useState(false)
    const modalClose = () =>{
        setIsModalVisible(false)
    }

    const handleDelete = async (id) =>{
        await Promise.all([dispatch(deleteTest(id))])
        changeListener(true)
        modalClose()
    }

    const CheckDate = (title,id,upTestId) =>{
        //let today = new Date()
        //if(date!=today){
          //  Alert.alert(
            //    "Nem kezdheti el a tesztet!",
           //     "A teszt időpontja nem egyezik meg a mai dátummal így nem kezdheti el a tesztet",
             //   [
            //      {
                 //   text: "Rendben",
                //    style: "cancel",
               //   },
            //    ])
       // }
      //  else{
            navigation.navigate('TestSheet',{testname:title,testId:id,listType:listType,upcomingTestId:upTestId})
       // }
    }

     const passTestDataById = async (id) =>{
        return await BaseInstance.get(`test/${id}`).
        then((response)=>{
            let selectedTest = response.data
            console.log(selectedTest)
            navigation.navigate('CreateTest',{edit:true,testData:selectedTest,testListMode:listType})
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
        <Text style={testListStyle.listItemHeader}>{item.description}</Text>
        <View style={testListStyle.listCrudButtons}>
        <Pressable style={testListStyle.button} onPress={()=>passTestDataById(item.id)}><Ionicons name={'create-outline'} size={25} color={"white"}/></Pressable>
        <Pressable style={testListStyle.button} onPress={()=>onDeleteButtonPress(item.id)}><Ionicons name={'trash-outline'} size={25} color={"white"}/></Pressable>
        </View>
        <View style={testListStyle.testFooterContainer}>
        </View>
        </View>
        </Pressable>
        
    )

      const handleClick = async (item) =>{
        if(c.role=='STUDENT'){
          CheckDate(item.test.title,item.testId,item.id)
        }
        else{
          await Promise.all([dispatch(getTeacherFilledTestsGroupedByUpcomingTest(item.id))])
          navigation.navigate('FilledTestListinForTeachers',{upcomingTestId:item.id})
        }
      }

    const PublishedItem = ({item,date}) =>(
        <Pressable onPress={()=>handleClick(item)} android_ripple="true">
        <View style={testListStyle.listitem}>
        <Text style={testListStyle.listItemHeader}>Teszt neve: {item.test.title}</Text>
        <Text style={testListStyle.listItemHeader}>Teszt leírása: {item.test.description}</Text>
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
          
                />
            )
        }
    }
    return(
          <SafeAreaView style={testListStyle.container}>
            <FlatList
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={renderItem}
            keyExtractor = {item=>item.id.toString()}
            ></FlatList>
          </SafeAreaView>  
        
    )
    
}