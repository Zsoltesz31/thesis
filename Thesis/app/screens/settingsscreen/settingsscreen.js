import React from 'react'
import { View ,SafeAreaView, Text} from 'react-native'
import { useState } from 'react'
import LanguageSelector from './../../../components/languageSelector/index'
import { useTranslation } from 'react-i18next'
import { settingsscreenStyle } from './settingsscreenStyle'
import {SectionList,Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import CustomHeader from '../../../components/header/header'
import {CustomSwitch} from '../../../components/switch/customSwitch'


export default function ProfileScreen({route}){
    const [isEnabled, setIsEnabled] = useState(false);
    const {t} = useTranslation()

    const toggleSwitch = () => setIsEnabled(previusState=>!previusState)

    const settingsOptions = [
        {
            id:'1',
            title:'Megjelenítés',
            icon: ( <Ionicons name={'color-palette-outline'} size={20} color={"#009AB9"}/> ),
            data : [
                <CustomSwitch label="Sötét mód" value={isEnabled} onValueChangeEvent={toggleSwitch}></CustomSwitch>
            ]
        },
        {
            id:'2',
            title:'Nyelv',
            icon: ( <Ionicons  name={'language-outline'} size={20} color={"#009AB9"}/> ),
            data:[
                <LanguageSelector/>
            ] 
        },
    
        {
            id:'3',
            title:'Rólunk',
            icon: ( <Ionicons name={'information-circle-outline'} size={20} color={"#009AB9"}/> ),
            data: [
                'Az alkalmazásról'
            ]
        },
        {
            id:'4',
            title:'Értesítések',
            icon: ( <Ionicons name={'notifications-outline'} size={20} color={"#009AB9"}/> ),
            data: [
                'Némítás',
                'Értesítések kikapcsolása'
            ]
        }
    ]

    async function componentDidMount() {
        await Font.loadAsync({
          ionicons: Ionicons.font['ionicons'] 
        });
        this.setState({ isReady: true });
      }

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
                <Text style={settingsscreenStyle.settingsOptionTextTitle}>{title}</Text>
                <View style={settingsscreenStyle.icon}>{icon}</View>
                </View>
            )}
            />
            </View>
            
        </SafeAreaView>

    )
}