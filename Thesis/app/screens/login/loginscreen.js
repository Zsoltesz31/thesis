import React, {useState,useCallback } from 'react'
import { SafeAreaView, View, Image, Pressable,Text } from 'react-native'
import {Card, TextInput, Button} from 'react-native-paper'
import { loginScreenStyle } from './loginscreenstyle'
import Images from '../../../images/index';
import {CustomInput} from '../../../components/inputs/inputs'
import {CustomButton} from '../../../components/buttons/buttons'
import {theme} from '../../../AppStyle'
import { useDispatch } from 'react-redux';
import { login } from "./../../../actions/auth"
import { useFocusEffect } from '@react-navigation/native';
import CustomHeader from '../../../components/header/header';
import CustomFooter from '../../../components/footer/footer';


export default function LoginScreen({ route,navigation }) {
    const [outlineColor,setOutlineColor]=useState('#009AB9')
    const [pwOutlineColor,setPwOutlineColor]=useState('#009AB9')
    const [userNameError,setUserNameError] = useState('')
    const [pswError, setPswError] = useState('')
    const [loginError,setLoginError] = useState('')
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [disableStatus,setDisableStatus] = useState(false)
    const dispatch = useDispatch()
    const loginTitle = route.params.loginType === 'student' ? 'Bejelentkezés hallgatóknak' : 'Bejelentkezés tanároknak'
    
    /*useFocusEffect(()=>{
        useCallback(()=>{
        if(loginType==='student'){
            setLoginTitle('Bejelentkezés hallgatóknak')
            console.log(loginType)
        }
        else if(loginType==='teacher'){
            setLoginTitle('Bejelentkezés tanároknak')
            console.log(loginType)
        }}
        )
        return() => {
            console.log(loginType)
        }
    })*/

    const onLogin = () => {
        let user = {
            username: username,
            password: password
        }

        dispatch(login(user)).then((response)=>{
            if(response.status=="success"){
                navigation.replace('Main', {
                    screen: 'Főoldal',
                    params: {loginType:route.params.loginType,userName:user.username}
                })
            }
        })
        .catch((error)=>{
   
            setLoginError('Sikertelen bejelentkezés')
          
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
            <Card style={loginScreenStyle.card} theme={{roundness:20,}}>
                <Card.Title titleStyle={{ color:"rgba(0,153,218,200)", fontWeight:"bold", textAlign:"center"}} title={loginTitle} ></Card.Title>
                <Card.Content>
                    <Image source={ Images.loginimage } style={loginScreenStyle.cardimage}/>
                    <TextInput outlineColor={outlineColor} onBlur={()=>validateNk(username)} label="Neptun kód" mode='outlined' theme={{roundness:40}} value={username} onChangeText={text => setUsername(text)}></TextInput>
                    {userNameError.length>0 && 
                    <Text>
                        {userNameError}
                    </Text>
                    }
                    <TextInput outlineColor={pwOutlineColor} onBlur={()=>validatePassword(password)} label="Jelszó" mode ='outlined' secureTextEntry={true} theme={{roundness:40}} value={password} onChangeText={text => setPassword(text)}></TextInput>
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
                    <CustomButton buttonName='Vissza' onPress={()=>navigation.replace('ChooseUserType')}></CustomButton>
                </Card.Content>
            </Card>
            </View>
            <CustomFooter></CustomFooter>
        </SafeAreaView>
    )
}