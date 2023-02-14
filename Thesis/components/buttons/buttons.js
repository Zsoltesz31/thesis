import React from 'react'
import {Text,Pressable,View, TouchableOpacity} from 'react-native'
import {buttonsStyle} from './buttonsstyle'

export const CustomButton=({buttonName,onPress}) => {
    return(
        <TouchableOpacity style={buttonsStyle.button} onPress={onPress}>
            <Text style={buttonsStyle.text}>{buttonName}</Text>
        </TouchableOpacity >
    )
}