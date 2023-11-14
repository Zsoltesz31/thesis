import React, {useState} from 'react'
import {SafeAreaView,Text,View } from 'react-native'
import { ForgotPasswordscreenStyle } from './forgotPasswordscreenStyle'
import {CustomInput} from '../../../components/inputs/inputs'
import {CustomButton} from '../../../components/buttons/buttons'
import CustomHeader from '../../../components/header/header'
import CustomFooter from '../../../components/footer/footer'
import { useTranslation } from 'react-i18next'
import { forgotPassword } from '../../../slices/usersSlice'
import { useDispatch } from 'react-redux'

export default function ForgotPasswordScreen({navigation}){
    const {t} = useTranslation()
    const [outlineColor,setOutlineColor]=useState('#009AB9')
    const [email,setEmail] = useState('')
    const [emailError,setEmailError] = useState('')
    const dispatch = useDispatch()

    const validateEmail = (email) =>{
        var re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
        if(email==''){
            return (
                setEmailError('Az e-mail mező nem lehet üresen!'),
                setOutlineColor('red')
                )
        }
        if(!re.test(email)){
            return(
             setEmailError('A beírt e-mail nem megfelelő formátummal rendelkezik!'),
            setOutlineColor('red')
            )
        }
        else{
            dispatch(forgotPassword(email))
            return(
                setOutlineColor('#009AB9'),
                setEmailError('')
            )
        }
    }
    

    return(
        <SafeAreaView style={ForgotPasswordscreenStyle.content}>
            <CustomHeader></CustomHeader>
            <View style={ForgotPasswordscreenStyle.formContainer}>
            <Text style={ForgotPasswordscreenStyle.title}>{t('forgotPassword')}</Text>
            <CustomInput onEndEditing={validateEmail} inputValue={email} onChangeTextEvent={text =>setEmail(text)} label={'E-mail'}  outlineColor={outlineColor}></CustomInput>
            {emailError.length>0 && 
            <Text>
                {emailError}
            </Text>
            }
            <CustomButton buttonName={t('passwordReminder')} onPress={()=> {validateEmail(email)}}></CustomButton>
            <CustomButton style={ForgotPasswordscreenStyle.backButton} buttonName={t('back')} onPress={()=>navigation.goBack()}></CustomButton>
            </View>
            <CustomFooter></CustomFooter>
        </SafeAreaView>
    )
}