import React,{useState,useEffect} from 'react'
import { Pressable, SafeAreaView,Text,View } from 'react-native'
import CustomHeader from '../../../components/header/header'
import { CustomButton } from '../../../components/buttons/buttons'
import { Ionicons } from '@expo/vector-icons';
import {useSelector,useDispatch} from 'react-redux'
import QuestionList from '../../../components/questionList/questionList'
import { getQuestionByTestId } from '../../../slices/questionSlice'
import { questionListScreenStyle } from './style'


export default function QuestionListScreen({navigation,route}){
    const dispatch = useDispatch()
    const {questions} =useSelector((state)=>state.question)
    const [changeHappened,setChangeHappened] = useState(false)


    useEffect(()=>{
        dispatch(getQuestionByTestId(route.params.testId))
        setChangeHappened(false)
    },[changeHappened])

    function changeTracker(changed){
        setChangeHappened(changed)
    }
 


    return(
        <SafeAreaView>
            <CustomHeader/>
            <View style={questionListScreenStyle.titleContainer}>
                <Pressable style={questionListScreenStyle.icon} onPress={()=>navigation.navigate('TestSheet',{testname:route.params.testname,testId:route.params.testId})}><Ionicons name={'chevron-back-outline'} size={25} color={'white'}/></Pressable>
                <Pressable><Text style={questionListScreenStyle.title}>{route.params.testname}</Text></Pressable>
            </View>
            <View style={questionListScreenStyle.listContainer}>
            <QuestionList testName={route.params.testname} testId={route.params.testId} changeListener={changeTracker} data={questions} navigation={navigation}></QuestionList>
            </View>
        </SafeAreaView>
    )
}