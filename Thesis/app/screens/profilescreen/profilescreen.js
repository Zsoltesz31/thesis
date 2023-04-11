import React,{useContext} from 'react'
import {SafeAreaView, Text, Image, View } from 'react-native'
import {Card} from 'react-native-paper'
import Images from '../../../images/index'
import { profilescreenStyle } from './profilscreenStyle'
import { CustomButton } from '../../../components/buttons/buttons'
import CustomHeader from '../../../components/header/header'
import { AuthContext } from '../../../context/AuthContext'
import { useTranslation } from 'react-i18next'

export default function ProfileScreen({route}){
    const {userData} = useContext(AuthContext)
    const {t} = useTranslation()
    return(
        <SafeAreaView style={profilescreenStyle.content}>
            <CustomHeader title={route.params.HeaderText}></CustomHeader>
            <Image style={profilescreenStyle.image} source={ Images.loginimage }/>
            <View style={profilescreenStyle.container}>
                    <View style={profilescreenStyle.textContainer}>
                    <Text style={profilescreenStyle.Text}>{t('firstName')}: {userData.firstName}</Text>
                    <Text style={profilescreenStyle.Text}>{t('lastName')}: {userData.lastName}</Text>
                    <Text style={profilescreenStyle.Text}>{t('e_mail')}: {userData.email}</Text>
                    </View>
            </View>
        </SafeAreaView>
    )
}