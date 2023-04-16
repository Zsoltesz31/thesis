import React from 'react'
import { View ,SafeAreaView, Text} from 'react-native'
import { useState } from 'react'
import LanguageSelector from './../../../components/languageSelector/index'
import { useTranslation } from 'react-i18next'
import { settingsscreenStyle } from './settingsscreenStyle'
import {SectionList,Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import CustomHeader from '../../../components/header/header'



export default function ProfileScreen({route}){
    const {t} = useTranslation()


    const settingsOptions = [

        {
            id:'1',
            title:'Nyelv',
            icon: ( <Ionicons  name={'language-outline'} size={20} color={"#009AB9"}/> ),
            data:[
                <LanguageSelector/>
            ] 
        },
    ]


        const Item = ({item}) => (
        <Pressable android_ripple="true"> 
        <View style={settingsscreenStyle.settingsOptionContainer}>
            <Text style={settingsscreenStyle.settingsOptionText}>{item}</Text>
        </View>
        </Pressable>
        )
    
  
        const renderItem=({item}) =>{
                return(
                    <Item
                    item={item}
                    />
                )
            
        }


    return(
        <SafeAreaView style={settingsscreenStyle.container}>
            <CustomHeader title={route.params.HeaderText}></CustomHeader>
            <View style={settingsscreenStyle.settingListContainer}>
            <SectionList
            sections = {settingsOptions}
            keyExtractor={id=>id}
            renderItem={renderItem}
            renderSectionHeader={({section:{title,icon}}) =>(
                <View style={settingsscreenStyle.settingsOptionTitleContainer}>
                <Text style={settingsscreenStyle.settingsOptionTextTitle}>{title=='Megjelenítés' ? t('display') : t('language')}</Text>
                <View style={settingsscreenStyle.icon}>{icon}</View>
                </View>
            )}
            />
            </View>
            
        </SafeAreaView>

    )
}