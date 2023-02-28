import React, {useState} from 'react'
import { Pressable, SafeAreaView,Text } from 'react-native'
import { ForgotPasswordscreenStyle } from './forgotPasswordscreenStyle'
import {CustomInput} from '../../../components/inputs/inputs'
import {CustomButton} from '../../../components/buttons/buttons'

export default function ForgotPassword({route,navigation}){
    const [email,setEmail] = useState('')
    const [newPassword,setNewPassword] = useState('')
    const [newPassword2,setNewPassword2] = useState('')
    const [errorMsg,setErrorMsg] = useState('')
    const [pwErrorMsg,setPwErrorMsg] = useState('')



    const validateEmail = (email) =>{
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(email==='')
            return (setErrorMsg('Az e-mail mező nem lehet üresen!'))
        if(re.test(email))
            return(setErrorMsg('A be írt e-mail nem megfelelő formátummal rendelkezik!'))
    }

    const validatePassword = (password1,password2) =>{
        if(password1 || password2 ==='')
            return(setPwErrorMsg('A jelszó mezők nem lehetnek üresen!'))
        if(password1!==password2)
            return(setPwErrorMsg('A két jelszó nem egyezik meg!'))
    }

    const validateOnSubmit = () => {
        validateEmail(email)
        validatePassword(newPassword,newPassword2)
    }


    return(
        <SafeAreaView style={ForgotPasswordscreenStyle.content}>
            <Text style={ForgotPasswordscreenStyle.title}>Jelszó emlékeztető</Text>
            <CustomInput inputValue={email} onChangeTextEvent={text =>setEmail(text)} label={'E-mail'}></CustomInput>
            {errorMsg.length>0}
            <CustomInput inputValue={newPassword} onChangeTextEvent={text=>setNewPassword(text)} label={'Új jelszó'}></CustomInput>
            <CustomInput inputValue={newPassword2} onChangeTextEvent={text=>setNewPassword2(text)} label={'Új jelszó újra'}></CustomInput>
            <CustomButton buttonName={'Jelszó emlékeztető'} onPress={()=>console.log('dosmth')}></CustomButton>
            <CustomButton style={ForgotPasswordscreenStyle.backButton} buttonName={'Vissza'} onPress={()=>navigation.navigate('Login',{loginType:route.params.loginType})}></CustomButton>
        </SafeAreaView>
    )
}