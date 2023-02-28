import React from 'react'
import { Pressable, SafeAreaView,Text } from 'react-native'
import { ForgotPasswordScreenstyle } from './forgotPasswordscreenStyle'
import {CustomInput} from '../../../components/inputs/inputs'
import {CustomButton} from '../../../components/buttons/buttons'

export default function ForgotPassword({route,navigation}){
    console.log(route.params.loginType)
    return(
        <SafeAreaView>
            <Text>Jelszó emlékeztető</Text>
            <CustomInput label={'E-mail'}></CustomInput>
            <CustomInput label={'Új jelszó'}></CustomInput>
            <CustomInput label={'Új jelszó újra'}></CustomInput>
            <CustomButton buttonName={'Jelszó emlékeztető'} onPress={()=>console.log('dosmth')}></CustomButton>
            <CustomButton buttonName={'Vissza'} onPress={()=>navigation.navigate('Login',{loginType:route.params.loginType})}></CustomButton>
        </SafeAreaView>
    )
}