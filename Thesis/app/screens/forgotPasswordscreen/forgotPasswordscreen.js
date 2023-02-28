import React from 'react'
import { Pressable, SafeAreaView,Text } from 'react-native'
import { ForgotPasswordscreenStyle } from './forgotPasswordscreenStyle'
import {CustomInput} from '../../../components/inputs/inputs'
import {CustomButton} from '../../../components/buttons/buttons'

export default function ForgotPassword({route,navigation}){
    console.log(route.params.loginType)
    return(
        
        <SafeAreaView style={ForgotPasswordscreenStyle.content}>
            <Text style={ForgotPasswordscreenStyle.title}>Jelszó emlékeztető</Text>
            <CustomInput label={'E-mail'}></CustomInput>
            <CustomInput label={'Új jelszó'}></CustomInput>
            <CustomInput label={'Új jelszó újra'}></CustomInput>
            <CustomButton buttonName={'Jelszó emlékeztető'} onPress={()=>console.log('dosmth')}></CustomButton>
            <CustomButton style={ForgotPasswordscreenStyle.backButton} buttonName={'Vissza'} onPress={()=>navigation.navigate('Login',{loginType:route.params.loginType})}></CustomButton>
        </SafeAreaView>
    )
}