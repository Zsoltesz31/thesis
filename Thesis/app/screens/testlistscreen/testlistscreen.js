import React,{useState,useEffect} from 'react'
import { Pressable, SafeAreaView,Text,View } from 'react-native'
import CustomHeader from '../../../components/header/header'
import { CustomButton } from '../../../components/buttons/buttons'
import { testListScreenStyle } from './style'
import { Ionicons } from '@expo/vector-icons';
import {useSelector,useDispatch} from 'react-redux'
import { getAllTests } from '../../../slices/testSlice'
import TestList from '../../../components/testList/testList'


export default function TestListScreen({navigation,route}){
    const dispatch = useDispatch()
    const {tests} =useSelector((state)=>state.test)
    const [changeHappened,setChangeHappened] = useState(false)


    useEffect(()=>{
        dispatch(getAllTests())
        console.log(changeHappened)
        setChangeHappened(false)
    },[changeHappened])

    function changeTracker(changed){
        setChangeHappened(changed)
    }
 


    return(
        <SafeAreaView>
            <CustomHeader/>
            <View style={testListScreenStyle.titleContainer}>
                <Pressable style={testListScreenStyle.icon} onPress={()=>navigation.navigate('Kurzusaid')}><Ionicons name={'chevron-back-outline'} size={25} color={'white'}/></Pressable>
                <Pressable><Text style={testListScreenStyle.title}>ABCD</Text></Pressable>
            </View>
            <View style={testListScreenStyle.listContainer}>
            <TestList changeListener={changeTracker} data={tests} navigation={navigation}></TestList>
            <CustomButton buttonName={'Teszt létrehozása'} onPress={()=>navigation.navigate('CreateTest',{edit:false,testData:{title:'',description:''}})}></CustomButton>
            <CustomButton buttonName={'Teszt gomb'}></CustomButton>
            </View>
        </SafeAreaView>
    )
}