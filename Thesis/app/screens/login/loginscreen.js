import React, {useState,useCallback } from 'react'
import { SafeAreaView, View, Image } from 'react-native'
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
            navigation.replace('Login')
        })
    }

    const checkLoginType = () => {
        if(loginType==='student'){
            setLoginTitle('Bejelentkezés hallgatóknak')
            console.log(loginType)
        }
        else if(loginType==='teacher'){
            setLoginTitle('Bejelentkezés tanároknak')
            console.log(loginType)
        }
    }

    return(
        <SafeAreaView style={loginScreenStyle.content} theme={theme}>
           <View style={loginScreenStyle.view}>
            <Card style={loginScreenStyle.card} theme={{roundness:20,}}>
                <Card.Title titleStyle={{ color:"rgba(0,153,218,200)", fontWeight:"bold", textAlign:"center"}} title={loginTitle} ></Card.Title>
                <Card.Content>
                    <Image source={ Images.loginimage } style={loginScreenStyle.cardimage}/>
                    <TextInput label="Neptun kód" mode='outlined' theme={{roundness:40}} value={username} onChangeText={text => setUsername(text)}></TextInput>
                    <TextInput label="Jelszó" mode ='outlined' secureTextEntry={true} theme={{roundness:40}} value={password} onChangeText={text => setPassword(text)}></TextInput>
                    <Button uppercase={false}>Elfelejtett jelszó</Button>
                    <CustomButton buttonName='Bejelentkezés' onPress={()=>onLogin()}></CustomButton>
                    <CustomButton buttonName='Vissza' onPress={()=>navigation.replace('ChooseUserType')}></CustomButton>
                </Card.Content>
            </Card>
            </View>
        </SafeAreaView>
    )
}