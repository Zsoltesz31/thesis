import React from 'react'
import { View ,SafeAreaView, Text, Switch, Touchable } from 'react-native'
import {List} from 'react-native-paper'
import { useState } from 'react'
import {EventRegister} from 'react-native-event-listeners'
import {LanguageSelector} from './../../../components/languageSelector/index'
import { useTranslation } from 'react-i18next'
import { settingsscreenStyle } from './settingsscreenStyle'
import {SectionList,Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import CustomHeader from '../../../components/header/header'

const settingsOptions = [
    {
        id:'1',
        title:'Megjelenítés',
        icon: ( <Ionicons name={'color-palette-outline'} size={20} color={"#009AB9"}/> ),
        data : [
            'asd'
        ]
    },
    {
        id:'2',
        title:'Nyelv',
        icon: ( <Ionicons  name={'language-outline'} size={20} color={"#009AB9"}/> ),
        data:[
            'asd'
        ] 
    },

    {
        id:'3',
        title:'Rólunk',
        icon: ( <Ionicons name={'information-circle-outline'} size={20} color={"#009AB9"}/> ),
        data: [
            'asd'
        ]
    },
    {
        id:'4',
        title:'Értesítések',
        icon: ( <Ionicons name={'notifications-outline'} size={20} color={"#009AB9"}/> ),
        data: [
            'asd',
            'asdasd'
        ]
    }
]

export default function ProfileScreen({route}){
    const [isEnabled, setIsEnabled] = useState(false);
    const {t} = useTranslation()

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
    
  
        const renderItem=({item,id}) =>{
            console.log(id)
            if(id==='2')
                return(
                    <LanguageSelector/>
                ) 
            else if(id==='1')
                return(
                    <Text>Teszt</Text>
                )
            else
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