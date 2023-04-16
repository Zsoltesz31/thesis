import React, { useEffect, useState, useRef,useContext } from 'react'
import { SafeAreaView, Text,Pressable,View,ScrollView } from 'react-native'
import {CustomInput} from '../../../components/inputs/inputs'
import {CustomButton} from '../../../components/buttons/buttons'
import {ConfirmationModal} from "../../../components/modals/confirmation_modal"
import { mainScreenStyle } from './mainscreenStyle'
import CustomListView from '../../../components/listview/index'
import CustomHeader from '../../../components/header/header'
import { AuthContext } from '../../../context/AuthContext'
import { useTranslation } from 'react-i18next'



export default function MainScreen({route}){
    const {userData} = useContext(AuthContext)
    const {t} = useTranslation()

    return(
        <SafeAreaView style={mainScreenStyle.container}>
            <CustomHeader></CustomHeader>
            <Text style={mainScreenStyle.title}>{userData.firstName} {userData.lastName}</Text>
            <Text style={mainScreenStyle.welcomeTitle}>{t('welcome')}</Text>
            <View style={mainScreenStyle.container}>
                {userData.role=='STUDENT' &&
                <View>
                <Text style={mainScreenStyle.desc}>{t('appDesc')}
                </Text>
                <Text style={mainScreenStyle.desc}>{t('studentAccDesc')}</Text>
                <Text style={mainScreenStyle.desc}>{t('navigationDesc')}</Text>
                </View>
                }
                 {userData.role=='TEACHER' &&
                <View>
                <Text style={mainScreenStyle.desc}>{t('appDesc')}
                </Text>
                <Text style={mainScreenStyle.desc}>{t('teacherAccDesc')}
                </Text>
                <Text style={mainScreenStyle.desc}>{t('navigationDesc')}</Text>
                </View>
                }
            </View>
        </SafeAreaView>
    )
}