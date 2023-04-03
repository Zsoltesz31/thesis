import React,{useState,useEffect} from 'react'
import { Pressable, SafeAreaView,Text,View } from 'react-native'
import CustomHeader from '../../../components/header/header'
import { CustomButton } from '../../../components/buttons/buttons'
import { testListScreenStyle } from './style'
import { Ionicons } from '@expo/vector-icons';
import {useSelector,useDispatch} from 'react-redux'
import { getAllTests } from '../../../slices/testSlice'
import { getUpcomingTestByUserId } from '../../../slices/upcommingTestSlice'
import TestList from '../../../components/testList/testList'


export default function TestListScreen({navigation,route}){
    const dispatch = useDispatch()
    const {tests} =useSelector((state)=>state.test)
    const {upComingTests} =useSelector((state)=>state.upComingTest)
    const [changeHappened,setChangeHappened] = useState(false)

    useEffect(()=>{
        if(route.params.testListMode=='Tests'){
        dispatch(getAllTests())
        }
        else if(route.params.testListMode=='upComingTests')
        {
            dispatch(getUpcomingTestByUserId(1))
        }
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
                <Text style={testListScreenStyle.title}>Tesztek</Text>
            </View>
            <View style={testListScreenStyle.listContainer}>
            <TestList changeListener={changeTracker} data={route.params.testListMode=='Tests'? tests : upComingTests} navigation={navigation} listType={route.params.testListMode}></TestList>
            <CustomButton buttonName={'Teszt létrehozása'} onPress={()=>navigation.navigate('CreateTest',{edit:false,testData:{title:'',description:''}})}></CustomButton>
            </View>
        </SafeAreaView>
    )
}