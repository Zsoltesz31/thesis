import React from 'react'
import {Button,View,Text} from 'react-native'
import {CustomInput} from './../../inputs/inputs'
import {CustomButton} from './../../buttons/buttons'

export const LongAnwserQuestion=() => {
    return(
        <View>
            <Text>Fogalmazza meg a kérdés szövegét:</Text>
            <CustomInput placeholder="Kérdés szövege"></CustomInput>
            <Text>A válaszadáshoz szükséges programkód beszúrása?</Text>
            <CustomButton buttonName="Hozzáad"></CustomButton>
        </View>
    )
}