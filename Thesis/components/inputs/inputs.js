import React from 'react'
import {TextInput,View} from 'react-native'
import {inputsStyle} from './inputsstyle'


export const CustomInput=({placeholder}) => {
    return(
        <View style={inputsStyle.container}>

        <TextInput
        style={inputsStyle.inputText}
         placeholder={placeholder}>

         </TextInput>

         </View>
    )
}

