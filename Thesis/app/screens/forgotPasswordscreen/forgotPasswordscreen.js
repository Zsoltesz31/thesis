import React, {useEffect, useState} from 'react'
import { Pressable, SafeAreaView,Text } from 'react-native'
import { ForgotPasswordscreenStyle } from './forgotPasswordscreenStyle'
import {CustomInput} from '../../../components/inputs/inputs'
import {CustomButton} from '../../../components/buttons/buttons'
import { useFocusEffect } from '@react-navigation/native'


export default function ForgotPassword({route,navigation}){
    const [outlineColor,setOutlineColor]=useState('#009AB9')
    const [pwOutlineColor,setPwOutlineColor]=useState('#009AB9')
    const [email,setEmail] = useState('')
    const [newPassword,setNewPassword] = useState('')
    const [newPassword2,setNewPassword2] = useState('')
    const [errorMsg,setErrorMsg] = useState('')
    const [pwErrorMsg,setPwErrorMsg] = useState('')

    useEffect(()=>{
        if(navigation.isFocused()){
            console.log(errorMsg)
        }
    },[navigation.isFocused()])

    const validateEmail = (email) =>{
        var re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
        if(email==''){
            return (
                setErrorMsg('Az e-mail mező nem lehet üresen!'),
                setOutlineColor('red')
                )
        }
        if(!re.test(email)){
            return(
            setErrorMsg('A beírt e-mail nem megfelelő formátummal rendelkezik!'),
            setOutlineColor('red'),
            console.log('Itt vagyok email nem jó formatum')
            )
        }
    }

    const validatePassword = (password1,password2) =>{
        if(password1.length <=0 || password2.length <=0)
        {
            return(
            setPwErrorMsg('A jelszó mezők nem lehetnek üresen!'),
            setPwOutlineColor('red'),
            console.log('üres a jelszo')
            )
        }
        if(password1!==password2){
            return(
            setPwErrorMsg('A két jelszó nem egyezik meg!'),
            setPwOutlineColor('red'),
            console.log('nem egyezik a két jelszó')
            )
        }
    }

    const validateOnSubmit = () => {
        validateEmail(email)
        validatePassword(newPassword,newPassword2)
        if(errorMsg.length > 0 || pwErrorMsg.length >0){
            console.log('Cant change passwords')
        }
        else
        {
        resetErrorStates()
        console.log('Password changed')
        }
    }

    const resetErrorStates = () => {
        setErrorMsg('')
        setPwErrorMsg('')
        setOutlineColor('#009AB9')
        setPwOutlineColor('#009AB9')
    }
  
    return(
        <SafeAreaView style={ForgotPasswordscreenStyle.content}>
            <Text style={ForgotPasswordscreenStyle.title}>Jelszó emlékeztető</Text>
            <CustomInput inputValue={email} onChangeTextEvent={text =>setEmail(text)} label={'E-mail'}  outlineColor={outlineColor}></CustomInput>
            {errorMsg.length>0 && 
            <Text>
                {errorMsg}
            </Text>
            }
            <CustomInput inputValue={newPassword} onChangeTextEvent={text=>setNewPassword(text)} label={'Új jelszó'} outlineColor={pwOutlineColor}></CustomInput>
            <CustomInput inputValue={newPassword2} onChangeTextEvent={text=>setNewPassword2(text)} label={'Új jelszó újra'} outlineColor={pwOutlineColor}></CustomInput>
            {pwErrorMsg.length>0 && 
            <Text>
                {pwErrorMsg}
            </Text>
            }
            <CustomButton buttonName={'Jelszó emlékeztető'} onPress={()=> validateOnSubmit()}></CustomButton>
            <CustomButton style={ForgotPasswordscreenStyle.backButton} buttonName={'Vissza'} onPress={()=>navigation.navigate('Login',{loginType:route.params.loginType})}></CustomButton>
        </SafeAreaView>
    )
}