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
    const [emailError,setEmailError] = useState('')
    const [pswError, setPswError] = useState('')

    const validateEmail = (email) =>{
        var re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
        if(email==''){
            return (
                setEmailError('Az e-mail mező nem lehet üresen!'),
                setOutlineColor('red'),
                console.log('üres az email')
                )
        }
        if(!re.test(email)){
            return(
             setEmailError('A beírt e-mail nem megfelelő formátummal rendelkezik!'),
            setOutlineColor('red'),
            console.log('Itt vagyok email nem jó formatum')
            )
        }
        else{
            return(
                setOutlineColor('#009AB9'),
                setEmailError('')
            )
        }
    }

    const validatePassword = (password1,password2) =>{
        if(password1.length <=0 || password2.length <=0)
        {
            return(
            setPswError('A jelszó mezők nem lehetnek üresen!'),
            setPwOutlineColor('red'),
            console.log('üres a jelszo')
            )
        }
        if(password1!==password2){
            return(
            setPswError('A két jelszó nem egyezik meg!'),
            setPwOutlineColor('red'),
            console.log('nem egyezik a két jelszó')
            )
        }
        else{
            return(
            setPwOutlineColor('#009AB9'),
            setPswError('')
            )
        }
    }

    return(
        <SafeAreaView style={ForgotPasswordscreenStyle.content}>
            <Text style={ForgotPasswordscreenStyle.title}>Jelszó emlékeztető</Text>
            <CustomInput onEndEditing={validateEmail} inputValue={email} onChangeTextEvent={text =>setEmail(text)} label={'E-mail'}  outlineColor={outlineColor}></CustomInput>
            {emailError.length>0 && 
            <Text>
                {emailError}
            </Text>
            }
            <CustomInput  inputValue={newPassword} onChangeTextEvent={text=>setNewPassword(text)} label={'Új jelszó'} outlineColor={pwOutlineColor}></CustomInput>
            <CustomInput  inputValue={newPassword2} onChangeTextEvent={text=>setNewPassword2(text)} label={'Új jelszó újra'} outlineColor={pwOutlineColor}></CustomInput>
            {pswError.length>0 && 
            <Text>
                {pswError}
            </Text>
            }
            <CustomButton buttonName={'Jelszó emlékeztető'} onPress={()=> {validateEmail(email);validatePassword(newPassword,newPassword2)}}></CustomButton>
            <CustomButton style={ForgotPasswordscreenStyle.backButton} buttonName={'Vissza'} onPress={()=>navigation.navigate('Login',{loginType:route.params.loginType})}></CustomButton>
        </SafeAreaView>
    )
}