import React from 'react'
import {Text,Pressable,View, TouchableOpacity} from 'react-native'
import {buttonsStyle} from './buttonsstyle'

export const CustomButton=({buttonName,onPress,disabledStatus}) => {
    return(
        <Pressable style={buttonsStyle.button} onPress={onPress} disabled={disabledStatus}>
            <Text style={buttonsStyle.text}>{buttonName}</Text>
        </Pressable >
    )
}