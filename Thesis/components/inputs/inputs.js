import React from 'react'
import {View} from 'react-native'
import { TextInput } from 'react-native-paper'
import {inputsStyle} from './inputsstyle'


export const CustomInput=({label,onChangeTextEvent,inputValue,outlineColor,onBlurEvent,multiline}) => {
    return(
        

        <TextInput multiline={multiline} onBlur={onBlurEvent} value={inputValue} onChangeText={onChangeTextEvent} label={label} theme={{roundness:40}} outlineColor={outlineColor} style={{height:40, margin:5}} mode='outlined'
         >
         </TextInput>

   
    )
}

