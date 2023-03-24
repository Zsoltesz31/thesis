import React, {useState,useContext,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { SafeAreaView,View,Text,Pressable} from 'react-native'
import CustomHeader from '../../../components/header/header'
import { CustomButton } from '../../../components/buttons/buttons'
import { CustomInput } from '../../../components/inputs/inputs'
import { CreateTestScreenStyle } from './style'
import { Ionicons } from '@expo/vector-icons';
import { createTest,getAllTests,getTestById,updateTest } from '../../../slices/testSlice'
import { AuthContext } from '../../../context/AuthContext'

export default function CreateTestScreen({route,navigation}){
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const dispatch = useDispatch()
    const {userData} = useContext(AuthContext)
    const editMode = route.params.edit


    const handleAdd = ()=>{
        let values = {
            title:title,
            description:description,
            ownerId:userData.id
        }
         dispatch(createTest(values))
        dispatch(getAllTests())
        navigation.navigate('Tesztek')
    }

    const handleEdit = () =>{
        let values = {
            title:title,
            description:description,
            ownerId:userData.id,
            testId: route.params.testData.test.id
        }
         dispatch(updateTest(values))
        dispatch(getAllTests())
        navigation.navigate('Tesztek')
    }

    if(editMode==false)
    {
    return(
        <SafeAreaView>
            <CustomHeader/>
            <View style={CreateTestScreenStyle.titleContainer}>
                <Pressable style={CreateTestScreenStyle.icon} onPress={()=>navigation.navigate('Kurzusaid')}><Ionicons name={'chevron-back-outline'} size={25} color={'white'}/></Pressable>
                <Text style={CreateTestScreenStyle.title1}>Teszt létrehozása</Text>
            </View>
            <View style={CreateTestScreenStyle.formContainer}>
                <Text style={CreateTestScreenStyle.formTitle}>Teszt adatai</Text>
                <CustomInput label={'Teszt neve'} onChangeTextEvent={text => setTitle(text)} outlineColor={'#009AB9'}></CustomInput>
                <CustomInput label={'Teszt leírása'} onChangeTextEvent={text => setDescription(text)} outlineColor={'#009AB9'}></CustomInput>
                <CustomButton buttonName={'Létrehoz'} onPress={()=>handleAdd()}></CustomButton>
            </View>
        </SafeAreaView>
    )
    }else if(editMode==true){
        const [title,setTitle] = useState(route.params.testData.test.title)
         const [description,setDescription] = useState(route.params.testData.test.description)
        return(
        <SafeAreaView>
            <CustomHeader/>
            <View style={CreateTestScreenStyle.titleContainer}>
                <Pressable style={CreateTestScreenStyle.icon} onPress={()=>navigation.navigate('Kurzusaid')}><Ionicons name={'chevron-back-outline'} size={25} color={'white'}/></Pressable>
                <Text style={CreateTestScreenStyle.title1}>Teszt módosítása</Text>
            </View>
            <View style={CreateTestScreenStyle.formContainer}>
                <Text style={CreateTestScreenStyle.formTitle}>Teszt adatai</Text>
                <CustomInput inputValue={title} label={'Teszt neve'} onChangeTextEvent={text => setTitle(text)} outlineColor={'#009AB9'}></CustomInput>
                <CustomInput inputValue={description} label={'Teszt leírása'} onChangeTextEvent={text => setDescription(text)} outlineColor={'#009AB9'}></CustomInput>
                <CustomButton buttonName={'Módosít'} onPress={()=>handleEdit()}></CustomButton>
            </View>
        </SafeAreaView>
        )
    }
}