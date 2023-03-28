import React,{useState,useEffect} from 'react'
import { Pressable, SafeAreaView,Text,View } from 'react-native'
import CustomHeader from '../../../components/header/header'
import { testEndScreenStyle } from './style'
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../../../components/buttons/buttons';
import { ConfirmationModal } from '../../../components/modals/confirmation_modal';
import { TestScreenStyle } from './style';
import { LongAnswerQuestion } from '../../../components/questionComponents/longAnswerQuestion/longAnswerQuestion';
import { OptionChoiceQuestion } from '../../../components/questionComponents/optionChoiceQuestion/optionChoiceQuestion';
import { MultipleOptionQuestion } from '../../../components/questionComponents/multipleOptionQuestion/multipleOptionQuestion';
import { ShortAnswerQuestion } from '../../../components/questionComponents/shortAnswerQuestion/shortAnswerQuestion'


export default function TestScreen({navigation,route}){
    const [answers,setAnswers] = useState([])

    const getAnwsers = (answer) =>{
        setAnswers(answer)
    } 
    useEffect(()=>{
        console.log('PARENT:',answers)
    },[answers])

    return(
        <SafeAreaView style={TestScreenStyle.screenContainer}>
            <CustomHeader/>
            <View style={TestScreenStyle.titleContainer}>
                <Pressable style={TestScreenStyle.icon} onPress={()=>navigation.navigate('TestSheet',{testId:route.params.testId,testName:route.params.testName,courseId:route.params.courseId})}><Ionicons name={'chevron-back-outline'} size={25} color={'white'}/></Pressable>
                <Text style={TestScreenStyle.title}>Teszt kitöltése</Text>
            </View>
            <View style={TestScreenStyle.questionContainer}>
                <LongAnswerQuestion getAnwsers={getAnwsers}></LongAnswerQuestion>
                <MultipleOptionQuestion getAnwsers={getAnwsers}></MultipleOptionQuestion>
                <OptionChoiceQuestion getAnwsers={getAnwsers}></OptionChoiceQuestion>
                <ShortAnswerQuestion getAnwsers={getAnwsers}></ShortAnswerQuestion>
            </View>
        </SafeAreaView>
    )
}