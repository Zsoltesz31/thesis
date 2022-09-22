import React from 'react'
import { SafeAreaView, Text } from 'react-native'
import { useTheme } from 'react-native-paper'
import {CustomInput} from '../../../components/inputs/inputs'
import {CustomButton} from '../../../components/buttons/buttons'

export default function MainScreen(){

    const {colors} = useTheme()
    return(
        <SafeAreaView>
           <CustomInput placeholder="asd"></CustomInput>
           <CustomButton buttonName="asd"></CustomButton>
        </SafeAreaView>
    )
}