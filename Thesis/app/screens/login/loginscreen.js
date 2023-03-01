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

export default function LoginScreen({ route,navigation }) {
    const [outlineColor,setOutlineColor]=useState('#009AB9')
    const [pwOutlineColor,setPwOutlineColor]=useState('#009AB9')
    const [userNameError,setUserNameError] = useState('')
    const [pswError, setPswError] = useState('')
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
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
                navigation.replace('Main',{loginType:route.params.loginType})
            }
        })
        .catch((error)=>{
            navigation.replace('Login',{loginType:route.params.loginType})
        })
    }

    const validateNk = (username) =>{
        if(username==''){
            return (
                setUserNameError('A Neptun kód mező nem lehet üresen!'),
                setOutlineColor('red'),
                console.log(userNameError)
                )
        }
        else{
            return(
                setOutlineColor('#009AB9'),
                setUserNameError('')
            )
        }
    }

    const validatePassword = (password1) =>{
        if(password1.length <=0 )
        {
            return(
            setPswError('A jelszó mező nem lehet üresen!'),
            setPwOutlineColor('red')
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
        <SafeAreaView style={loginScreenStyle.content} theme={theme}>
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
                    <CustomButton buttonName='Bejelentkezés' onPress={()=>onLogin()}></CustomButton>
                    <CustomButton buttonName='Vissza' onPress={()=>navigation.replace('ChooseUserType')}></CustomButton>
                </Card.Content>
            </Card>
            </View>
        </SafeAreaView>
    )
}