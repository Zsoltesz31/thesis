import React, {useContext, useState} from "react"
import { SafeAreaView,View,Text } from "react-native"
import { CustomButton } from "../../../components/buttons/buttons"
import { CustomInput } from "../../../components/inputs/inputs"
import CustomHeader from "../../../components/header/header"
import CustomFooter from '../../../components/footer/footer';
import { registerScreenStyle } from "./style";
import { AuthContext } from '../../../context/AuthContext';
import { useTranslation } from 'react-i18next'

import { useDispatch } from "react-redux"

export default function RegisterScreen({navigation,route}){
    const {register} = useContext(AuthContext)
    const {t} = useTranslation()

    const [outlineColorNames,setoutlineColorNames]=useState('#009AB9')
    const [outlineColorEmail,setoutlineColorEmail]=useState('#009AB9')
    const [outlineColorPw,setoutlineColorPw]=useState('#009AB9')

    const [firstName,setFirstName]=useState('')
    const [lastName,setLastName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [password2,setPassword2]=useState('')

    const [nameErrors,setNameErrors] = useState('')
    const [emailErrors,setEmailErrors] = useState('')
    const [passwordErrors,setPasswordErrors] = useState('')
    const [registerError,setRegisterError] = useState('')


    const validateEmail = (email) =>{
        var re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
        if(email==''){
            return (
                setEmailErrors('Az e-mail mező nem lehet üresen!'),
                setoutlineColorEmail('red')
                )
        }
        if(!re.test(email)){
            return(
                setEmailErrors('A beírt e-mail nem megfelelő formátummal rendelkezik!'),
             setoutlineColorEmail('red')
            )
        }
        else{
            return(
                setoutlineColorEmail('#009AB9'),
                setEmailErrors('')
            )
        }
    }

    const validateNames = (firstName,lastName) =>{
        if(firstName=='' || lastName==''){
            return (
                console.log(firstName),
                setNameErrors('A név mezőket nem lehet üresen hagyni!'),
                setoutlineColorNames('red')
                )
        }
        else{
            return(
                setoutlineColorNames('#009AB9'),
                setNameErrors('')
            )
        }
    }

    const validatePassword = (password,password1) =>{
        if(password1.length <=0 || password.length<=0 )
        {
            return(
                setPasswordErrors('A jelszó mező nem lehet üresen!'),
                setoutlineColorPw('red')
            )
        }
        if(password!=password1 ){
            return(
                setPasswordErrors('A két jelszó nem egyezik!'),
                setoutlineColorPw('red')
            )
        }
        else{
            return(
                setoutlineColorPw('#009AB9'),
                setPasswordErrors('')
            )
        }
    }

    const validateAll = (firstName,lastName,email,password,password1) =>{
        validateEmail(email)
        validatePassword(password,password1)
        validateNames(firstName,lastName)
        if(nameErrors=='' && emailErrors=='' && passwordErrors==''){
            register(firstName,lastName,email,password)
            navigation.navigate('Login')
        }
        else{
           console.log('fail')
        }
        
    }
    


    return(
        <SafeAreaView>
            <CustomHeader/>
                <Text style={registerScreenStyle.screenTitle}>{t('register')}</Text>
                <View style={registerScreenStyle.registerFormContainer}>
                    <View style={registerScreenStyle.inputs}>
                    <CustomInput label={t('lastName')}  onChangeTextEvent={text => setFirstName(text)} outlineColor={outlineColorNames} />
                    <CustomInput label={t('firstName')} onChangeTextEvent={text => setLastName(text)} outlineColor={outlineColorNames} />
                    {nameErrors.length>0 && 
                    <Text>
                        {nameErrors}
                    </Text>
                    }
                    <CustomInput label={t('e_mail')} onChangeTextEvent={text => setEmail(text)} outlineColor={outlineColorEmail}/>
                    {emailErrors.length>0 && 
                    <Text>
                        {emailErrors}
                    </Text>
                    }
                    <CustomInput label={t('password')} secureTextEntry={true}  onChangeTextEvent={text => setPassword(text)} outlineColor={outlineColorPw}/>
                    <CustomInput label={t('passwordRe')}  secureTextEntry={true} onChangeTextEvent={text => setPassword2(text)} outlineColor={outlineColorPw}/>
                    {passwordErrors.length>0 && 
                    <Text>
                        {passwordErrors}
                    </Text>
                    }
                    </View>
                    <View style={registerScreenStyle.buttons}>
                        <CustomButton buttonName={t('register')} onPress={ ()=>{validateAll(firstName,lastName,email,password,password2)}}/>
                            {registerError.length>0 && 
                            <Text>
                                {registerError}
                            </Text>
                            }
                        <CustomButton buttonName={t('back')} onPress={()=>navigation.navigate('Login')}/>
                    </View>
                </View>
            <CustomFooter/>
        </SafeAreaView>
    )
}