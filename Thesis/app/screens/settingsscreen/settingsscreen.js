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
        icon: ( <Ionicons name={'color-palette-outline'} size={10} color={'blue'}/> ),
        data : [
            'asd'
        ]
    },
    {
        id:'2',
        title:'Nyelv',
        icon: ( <Ionicons name={'language-outline'} size={10} color={'blue'}/> ),
        data:[
            'asd'
        ] 
    },

    {
        id:'3',
        title:'Rólunk',
        icon: ( <Ionicons name={'information-circle-outline'} size={10} color={'blue'}/> ),
        data: [
            'asd'
        ]
    },
    {
        id:'4',
        title:'Értesítések',
        icon: ( <Ionicons name={'notifications-outline'} size={10} color={'blue'}/> ),
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
        <Pressable onPress={()=>console.log(sid)} android_ripple="true"> 
        <View>
            <Text>{item}</Text>
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
        <SafeAreaView style={{flex:1}}>
            <CustomHeader title={route.params.HeaderText}></CustomHeader>
            <SectionList
            sections = {settingsOptions}
            keyExtractor={id=>id}
            renderItem={renderItem}
            renderSectionHeader={({section:{title,icon}}) =>(
                <Text>{icon}{title}</Text>
            )}
            />
            <List.Section>
                <List.Item title="Sötét mód" right={() => <Switch onValueChange={() => {setIsEnabled((value)=> !value)
                EventRegister.emit("changeTheme",isEnabled)
                }} value={isEnabled}/>}/>
            </List.Section>
            <LanguageSelector></LanguageSelector>
        </SafeAreaView>

    )
}