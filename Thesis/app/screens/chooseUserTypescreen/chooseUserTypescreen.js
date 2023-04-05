import React from 'react'
import { Pressable, SafeAreaView,Text } from 'react-native'
import { chooseUserScreenStyle } from './chooseUserTypescreenstyle'
import CustomHeader from '../../../components/header/header'
import CustomFooter from '../../../components/footer/footer'
import { useTranslation } from 'react-i18next'

export default function ChooseUserType({navigation}){
    const {t} = useTranslation()
    return(
        
        <SafeAreaView style={chooseUserScreenStyle.content}>
            <CustomHeader></CustomHeader>
            <Text style={chooseUserScreenStyle.title}>{t('welcome')}</Text>
            <Text style={chooseUserScreenStyle.subTitle}>{t('changeLoginType')}</Text>
            <Pressable style={chooseUserScreenStyle.button} onPress={ ()=> navigation.replace('Login',{loginType:'student'})}><Text style={chooseUserScreenStyle.buttonText}>{t('student')}</Text></Pressable>
            <Pressable style={chooseUserScreenStyle.button} onPress={ ()=> navigation.replace('Login',{loginType:'teacher'})}><Text style={chooseUserScreenStyle.buttonText}>{t('teacher')}</Text></Pressable>
            <CustomFooter></CustomFooter>
        </SafeAreaView>
    )
}