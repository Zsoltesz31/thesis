import React, {useContext, useState } from 'react'
import { SafeAreaView, View,Text } from 'react-native'
import { loginScreenStyle } from './loginscreenstyle'
import {CustomInput} from '../../../components/inputs/inputs'
import {CustomButton} from '../../../components/buttons/buttons'
import {theme} from '../../../AppStyle'
import { useTranslation } from 'react-i18next'
import { useDispatch} from 'react-redux';

import CustomHeader from '../../../components/header/header';
import CustomFooter from '../../../components/footer/footer';

import { AuthContext } from '../../../context/AuthContext';

export default function LoginScreen({ route,navigation }) {
    const dispatch = useDispatch()
    const {login,errorMsg} =useContext(AuthContext)
    const {t} = useTranslation() 
    const [outlineColor,setOutlineColor]=useState('#009AB9')
    const [pwOutlineColor,setPwOutlineColor]=useState('#009AB9')
    const [userNameError,setUserNameError] = useState('')
    const [pswError, setPswError] = useState('')
    const [loginError,setLoginError] = useState('')
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [disableStatus,setDisableStatus] = useState(false)


    const validateNk = (username) =>{
        if(username==''){
            return (
                setUserNameError('Az e-mail cím mező nem lehet üresen!'),
                setOutlineColor('red'),
                setDisableStatus(true)
                )
        }
        else{
            return(
                setOutlineColor('#009AB9'),
                setUserNameError(''),
                setDisableStatus(false)
            )
        }
    }

    const goLogin = () => {
        login(username,password)
    }


    const validatePassword = (password1) =>{
        if(password1.length <=0 )
        {
            return(
            setPswError('A jelszó mező nem lehet üresen!'),
            setPwOutlineColor('red'),
            setDisableStatus(true)
            )
        }
        else{
            return(
            setPwOutlineColor('#009AB9'),
            setPswError(''),
            setDisableStatus(false)
            )
        }
    }

    return(
        <SafeAreaView style={loginScreenStyle.content} theme={theme}>
           <CustomHeader></CustomHeader>
           <View style={loginScreenStyle.view}>
                    <Text style={loginScreenStyle.title}>{t('login')}</Text>
                    <CustomInput outlineColor={outlineColor} onBlurEvent={()=>validateNk(username)} label={t('e_mail')} mode='outlined' theme={{roundness:40}} value={username} onChangeTextEvent={text => setUsername(text)}></CustomInput>
                    {userNameError.length>0 && 
                    <Text style={{color:'red'}}>
                        {userNameError}
                    </Text>
                    }
                    <CustomInput secureTextEntry={true} outlineColor={pwOutlineColor} onBlurEvent={()=>validatePassword(password)} label={t('password')} mode ='outlined' theme={{roundness:40}} value={password} onChangeTextEvent={text => setPassword(text)}></CustomInput>
                    {pswError.length>0 && 
                    <Text style={{color:'red'}}>
                    {pswError}
                    </Text>
                    }
                    <CustomButton  buttonName={t('login')} onPress={()=> goLogin()}></CustomButton>
                    <Text style={{color:'red'}}>
                    {errorMsg}
                    </Text>
                    <CustomButton buttonName={t('forgotPassword')} onPress={()=>navigation.navigate('ForgotPasswordScreen')}></CustomButton>
                    <CustomButton buttonName={t('register')} onPress={()=>navigation.navigate('Register')}></CustomButton>
  
            </View>
            <CustomFooter></CustomFooter>
        </SafeAreaView>
    )
}