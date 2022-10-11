import React from 'react'
import {Button,View,Text} from 'react-native'
import {CustomInput} from './../../inputs/inputs'
import {CustomButton} from './../../buttons/buttons'

export const TrueOrFalseQuestion=() => {
    return(
        <View>
            <Text>Fogalmazza meg a kérdés szövegét:</Text>
            <CustomInput placeholder="Kérdés szövege"></CustomInput>
            <Text>Adjon meg a helyes választ:</Text>
            <CustomInput placeholder ="Helyes válasz"></CustomInput>
            <CustomButton buttonName="Hozzáad"></CustomButton>
            <Text>Adjon meg hamis válaszlehetőséget:</Text>
            <CustomInput placeholder ="Hamis válasz"></CustomInput>
            <CustomButton buttonName="Hozzáad"></CustomButton>
        </View>
    )
}