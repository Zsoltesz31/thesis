import React from 'react'
import {Text,Pressable,View} from 'react-native'
import { ShortAnswerQuestionStyle } from './style'
import { CustomInput } from '../../inputs/inputs'

export const ShortAnswerQuestion=({buttonName,onPress,disabledStatus}) => {
    return(
        <View>
            <Text>Kérdés szövege</Text>
            <CustomInput label={'Válasz'}></CustomInput>
        </View>
    )
}