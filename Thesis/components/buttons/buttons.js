import React from 'react'
import {Text} from 'react-native'
import {Pressable} from 'react-native'
import {buttonsStyle} from './buttonsstyle'

export const CustomButton=({buttonName,onPress,disabledStatus}) => {
    return(
        <Pressable style={buttonsStyle.button} onPress={onPress} disabled={disabledStatus}>
            <Text style={buttonsStyle.text}>{buttonName}</Text>
        </Pressable >
    )
}