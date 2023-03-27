import React from 'react'
import {Text,Pressable,View} from 'react-native'
import { LongAnswerQuestionStyle } from './style'
import { CustomInput } from '../../inputs/inputs'
import {CustomButton} from '../../buttons/buttons'


export const LongAnswerQuestion=({buttonName,onPress,disabledStatus}) => {
    return(
        <View>
            <Text>Kérdés szövege</Text>
            <CustomInput label={'Hosszú válasz'} multiline={true}></CustomInput>
            <CustomButton></CustomButton>
        </View>
    )
}