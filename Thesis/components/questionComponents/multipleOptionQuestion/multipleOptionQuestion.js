import React from 'react'
import {Text,Pressable,View} from 'react-native'
import { MultipleOptionQuestionStyle } from './style'

export const MultipleOptionQuestion=({buttonName,onPress,disabledStatus}) => {
    return(
        <View>
            <Text>Kérdés szövege</Text>
            <Pressable>Válasz lehetőség</Pressable>
            <Pressable>Válasz lehetőség</Pressable>
            <Pressable>Válasz lehetőség</Pressable>
            <Pressable>Válasz lehetőség</Pressable>
        </View>
    )
}