import React from 'react'
import {Text,Pressable,View} from 'react-native'
import { OptionChoiceQuestionStyle } from './style'

export const OptionChoiceQuestion=({buttonName,onPress,disabledStatus}) => {
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