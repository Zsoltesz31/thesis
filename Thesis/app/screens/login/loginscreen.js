import React, {useState } from 'react'
import { SafeAreaView, View, Image, Pressable,Text } from 'react-native'
import {TextInput, Button} from 'react-native-paper'
import { loginScreenStyle } from './loginscreenstyle'
import Images from '../../../images/index';
import {CustomInput} from '../../../components/inputs/inputs'
import {CustomButton} from '../../../components/buttons/buttons'
import {theme} from '../../../AppStyle'
import { useDispatch,useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import CustomHeader from '../../../components/header/header';
import CustomFooter from '../../../components/footer/footer';

import axios from 'axios'

import { loginUser } from './../../../actions/auth';
import { getUserToken } from './../../../actions/auth';



export default function LoginScreen({ route,navigation }) {
    const dispatch = useDispatch()


    const [outlineColor,setOutlineColor]=useState('#009AB9')
    const [pwOutlineColor,setPwOutlineColor]=useState('#009AB9')
    const [userNameError,setUserNameError] = useState('')
    const [pswError, setPswError] = useState('')
    const [loginError,setLoginError] = useState('')
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [disableStatus,setDisableStatus] = useState(false)
    const loginTitle = route.params.loginType === 'student' ? 'Bejelentkezés hallgatóknak' : 'Bejelentkezés tanároknak'

    const onLogin = async () => {
        let user= {
            email:username,
            password:password
        }
        loginUser(user)
        await getUserToken('userToken')
        .then(data=>data)
        .then(value=>{
            if(value!=null){
                navigation.replace('Main', {
                    screen: 'Főoldal',
                    params: {loginType:route.params.loginType,userName:user.username}
                })
            }
        })
    }

    const validateNk = (username) =>{
        if(username==''){
            return (
                setUserNameError('A Neptun kód mező nem lehet üresen!'),
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
                    <Text style={loginScreenStyle.title}>Bejelentkezés {route.params.loginType=='student'? 'hallgatóknak' : 'oktatóknak'}</Text>
                    <CustomInput outlineColor={outlineColor} onBlurEvent={()=>validateNk(username)} label="Neptun kód" mode='outlined' theme={{roundness:40}} value={username} onChangeTextEvent={text => setUsername(text)}></CustomInput>
                    {userNameError.length>0 && 
                    <Text>
                        {userNameError}
                    </Text>
                    }
                    <CustomInput outlineColor={pwOutlineColor} onBlurEvent={()=>validatePassword(password)} label="Jelszó" mode ='outlined' secureTextEntry={true} theme={{roundness:40}} value={password} onChangeTextEvent={text => setPassword(text)}></CustomInput>
                    {pswError.length>0 && 
                    <Text>
                    {pswError}
                    </Text>
                    }
                    <Pressable onPress={()=>navigation.navigate('ForgotPassword',{loginType:route.params.loginType})}><Button uppercase={false}>Elfelejtett jelszó</Button></Pressable>
                    <CustomButton disabledStatus={disableStatus} buttonName='Bejelentkezés' onPress={()=>onLogin()}></CustomButton>
                    {loginError.length>0 && 
                    <Text style={{color:'red'}}>
                    {loginError}
                    </Text>
                    }
                    <CustomButton buttonName='Regisztráció' onPress={()=>navigation.navigate('Register',{loginType:route.params.loginType})}></CustomButton>
                    <CustomButton buttonName='Vissza' onPress={()=>navigation.replace('ChooseUserType')}></CustomButton>
  
            </View>
            <CustomFooter></CustomFooter>
        </SafeAreaView>
    )
}