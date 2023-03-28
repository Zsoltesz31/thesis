import React,{useState} from 'react'
import {Text,Pressable,View} from 'react-native'
import { LongAnswerQuestionStyle } from './style'
import { CustomInput } from '../../inputs/inputs'
import { TextInput } from 'react-native-paper'



export const LongAnswerQuestion=({getAnwsers}) => {
    const [answer,setAnswer] = useState('')
    return(
        <View style={LongAnswerQuestionStyle.questionContainer}>
            <Text style={LongAnswerQuestionStyle.questionTitle}>Kérdés szövege</Text>
            <TextInput label={'Válasz'}mode='outlined' theme={{roundness:40}} style={{margin:5}} multiline={true} onChange={text => setAnswer(text)} outlineColor={'#009AB9'}></TextInput>
        </View>
    )
}