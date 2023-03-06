import React from 'react'
import { Pressable, SafeAreaView,Text } from 'react-native'
import { chooseUserScreenStyle } from './chooseUserTypescreenstyle'
import CustomHeader from '../../../components/header/header'
import CustomFooter from '../../../components/footer/footer'

export default function ChooseUserType({navigation}){

    return(
        
        <SafeAreaView style={chooseUserScreenStyle.content}>
            <CustomHeader></CustomHeader>
            <Text style={chooseUserScreenStyle.title}>Üdvözöljük!</Text>
            <Text style={chooseUserScreenStyle.subTitle}>Válassza ki melyik felhasználó fiókba szeretne belépni!</Text>
            <Pressable style={chooseUserScreenStyle.button} onPress={ ()=> navigation.replace('Login',{loginType:'student'})}><Text style={chooseUserScreenStyle.buttonText}>Hallgató</Text></Pressable>
            <Pressable style={chooseUserScreenStyle.button} onPress={ ()=> navigation.replace('Login',{loginType:'teacher'})}><Text style={chooseUserScreenStyle.buttonText}>Oktató</Text></Pressable>
            <CustomFooter></CustomFooter>
        </SafeAreaView>
    )
}