import React from 'react'
import { Pressable, SafeAreaView,Text } from 'react-native'
import { chooseUserScreenStyle } from './chooseUserTypescreenstyle'

export default function ChooseUserType({navigation}){

    return(
        <SafeAreaView style={chooseUserScreenStyle.content}>
            <Pressable style={chooseUserScreenStyle.button} onPress={ ()=> navigation.replace('Login',{loginType:'student'})}><Text style={{color:'white'}}>Hallgató</Text></Pressable>
            <Pressable onPress={ ()=> navigation.replace('Login',{loginType:'teacher'})}><Text>Oktató</Text></Pressable>
        </SafeAreaView>
    )
}