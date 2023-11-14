import React,{useState,useContext,useEffect} from 'react'
import { Pressable, SafeAreaView,Text,View } from 'react-native'
import CustomHeader from '../../../components/header/header'
import { CheckedTestsScreenStyle } from './style'
import { Ionicons } from '@expo/vector-icons';
import CheckedTestList from '../../../components/checkedTests/checkedTests';
import { useSelector,useDispatch } from "react-redux";
import { getResultForStudent,getStudentFilledTestByCourseIdAndUserId } from '../../../slices/fillTestSlice';
import { AuthContext } from '../../../context/AuthContext'


export default function CheckedTestsScreen({navigation,route}){
    const dispatch = useDispatch()
    const {userData} = useContext(AuthContext)
    const {testResults} =useSelector((state)=>state.fill)

    useEffect(()=>{
        console.log(userData.role)
        if(userData.role=='STUDENT')
        {
        dispatch(getStudentFilledTestByCourseIdAndUserId(route.params.courseId))
        }
    },[])


    return(
        <SafeAreaView>
            <CustomHeader/>
            <View style={CheckedTestsScreenStyle.titleContainer}>
                <Pressable style={CheckedTestsScreenStyle.icon} onPress={()=>navigation.goBack()}><Ionicons name={'chevron-back-outline'} size={25} color={'white'}/></Pressable>
                <Text style={CheckedTestsScreenStyle.title}>Kitöltött tesztek</Text>
            </View>
            <CheckedTestList navigation={navigation} data={testResults}></CheckedTestList>
        </SafeAreaView>
    )
}