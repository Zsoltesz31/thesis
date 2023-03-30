import React,{useEffect, useState} from 'react'
import axios from 'axios'
import {View,Text,SafeAreaView,FlatList,Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import {testListStyle} from'./style'
import { deleteTest } from '../../slices/testSlice';
import { useDispatch, } from 'react-redux';
import { ConfirmationModal } from '../modals/confirmation_modal';
import { CustomButton } from '../buttons/buttons';


//Valami nem stimm a modallal mindig az utolsó elem adatait kapja meg


export default function TestList({navigation,courseId,data,changeListener}){
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

     const passTestDataById = async (id) =>{
        return await axios.get(`http://192.168.1.64:3333/test/${id}`).
        then((response)=>{
            let selectedTest = response.data.data
            console.log(selectedTest)
            navigation.navigate('CreateTest',{edit:true,testData:selectedTest})
        }
        )
    }
    const Item = ({item}) => (
        <Pressable onPress={()=>(navigation.navigate('TestSheet',{testname:item.title,testId:item.id}))} android_ripple="true">
        <View style={testListStyle.listitem}>
        <Text style={testListStyle.listItemHeader}>{item.title}</Text>
        <View style={testListStyle.listCrudButtons}>
        <Pressable onPress={()=>passTestDataById(item.id)}><Ionicons name={'create-outline'} size={20} color={"white"}/></Pressable>
        <Pressable onPress={()=>handleDelete(item.id)}><Ionicons name={'trash-outline'} size={20} color={"white"}/></Pressable>
        </View>
        <View style={testListStyle.testFooterContainer}>
        <Text style={testListStyle.deadline}>Határidő: {item.description}</Text>
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
    
    const renderItem=({item}) =>{
        return(
            <Item
            item={item}
            />
        )
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