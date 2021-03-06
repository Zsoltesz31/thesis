import React, { useState } from 'react'
import { SafeAreaView, View, Image } from 'react-native'
import {Card, TextInput, Button} from 'react-native-paper'
import { loginScreenStyle } from './loginscreenstyle'
import Images from '../../../images/index';
import {CustomInput} from '../../../components/inputs/inputs'
import {CustomButton} from '../../../components/buttons/buttons'
import {theme} from '../../../AppStyle'
import {Provider as PaperProvider} from 'react-native-paper'
import { TouchableOpacity } from 'react-native-web';

export const LoginScreen=( { navigation }) =>{
    const [neptun,setNeptun] = useState('')
    const [password,setPassword] = useState('')
    return(
        <SafeAreaView style={loginScreenStyle.content} theme={theme}>
           <View style={loginScreenStyle.view}>
            <Card style={loginScreenStyle.card} theme={{roundness:20,}}>
                <Card.Title titleStyle={{ color:"rgba(0,153,218,200)", fontWeight:"bold", textAlign:"center"}} title="Bejelentkezés" ></Card.Title>
                <Card.Content>
                    <Image source={ Images.loginimage } style={loginScreenStyle.cardimage}/>
                    <TextInput label="Neptun kód" mode='outlined' theme={{roundness:40}} value={neptun} onChangeText={text => setNeptun(text)}></TextInput>
                    <TextInput label="Jelszó" mode ='outlined' secureTextEntry={true} theme={{roundness:40}} value={password} onChangeText={text => setPassword(text)}></TextInput>
                    <Button uppercase={false}>Elfelejtett jelszó</Button>
                    <Button mode="contained"  theme={{roundness:30}} onPress={()=> {navigation.replace('Main')}}>Bejelentkezés</Button>
                </Card.Content>
            </Card>
            </View>
        </SafeAreaView>
    )
}