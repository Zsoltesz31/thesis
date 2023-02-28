import React from 'react'
import {View} from 'react-native'
import { TextInput } from 'react-native-paper'
import {inputsStyle} from './inputsstyle'


export const CustomInput=({label,onChangeTextEvent,inputValue}) => {
    return(
        

        <TextInput value={inputValue} onChangeText={onChangeTextEvent} label={label} theme={{roundness:40}} outlineColor='#009AB9' style={{height:40, width:'70%',margin:5}} mode='outlined'
         >
         </TextInput>

   
    )
}

