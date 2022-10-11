import React from 'react'
import {Button,View,Text} from 'react-native'
import {CustomInput} from './../../inputs/inputs'
import {CustomButton} from './../../buttons/buttons'

export const OptionChoices=() => {
    return(
        <View>
            <Text>Fogalmazza meg a kérdés szövegét:</Text>
            <CustomInput placeholder="Kérdés szövege"></CustomInput>
            <Text>Adjon meg válaszlehetőségeket</Text>
            <CustomInput placeholder ="Válaszlehetőség"></CustomInput>
            <CustomButton buttonName="Hozzáad"></CustomButton>
        </View>
    )
}