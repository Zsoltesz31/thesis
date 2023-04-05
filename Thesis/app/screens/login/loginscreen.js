import React, {useContext, useState } from 'react'
import { SafeAreaView, View, Image, Pressable,Text } from 'react-native'
import {TextInput, Button} from 'react-native-paper'
import { loginScreenStyle } from './loginscreenstyle'
import Images from '../../../images/index';
import {CustomInput} from '../../../components/inputs/inputs'
import {CustomButton} from '../../../components/buttons/buttons'
import {theme} from '../../../AppStyle'
import { useTranslation } from 'react-i18next'
import { useDispatch,useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
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
                    <Text style={loginScreenStyle.title}>{t('login')} {route.params.loginType=='student'? t('forStudent') : t('forTeacher')}</Text>
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
                    <CustomButton disabledStatus={disableStatus} buttonName={t('login')} onPress={()=>{login(username,password)}}></CustomButton>
                    <Text style={{color:'red'}}>
                    {errorMsg}
                    </Text>
                    <CustomButton buttonName={t('register')} onPress={()=>navigation.navigate('Register',{loginType:route.params.loginType})}></CustomButton>
                    <CustomButton buttonName={t('back')} onPress={()=>navigation.replace('ChooseUserType')}></CustomButton>
  
            </View>
            <CustomFooter></CustomFooter>
        </SafeAreaView>
    )
}