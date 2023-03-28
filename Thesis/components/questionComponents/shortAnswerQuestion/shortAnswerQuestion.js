import React,{useState} from 'react'
import {Text,Pressable,View} from 'react-native'
import { ShortAnswerQuestionStyle } from './style'
import { CustomInput } from '../../inputs/inputs'

export const ShortAnswerQuestion=() => {
    const [answer,setAnswer] = useState('')
    return(
        <View style={ShortAnswerQuestionStyle.questionContainer}>
            <Text style={ShortAnswerQuestionStyle.questionTitle} >Kérdés szövege</Text>
            <CustomInput label={'Válasz'} value={answer} onChangeTextEvent={text => setAnswer(text)}></CustomInput>
        </View>
    )
}