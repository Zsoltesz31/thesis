import React, { useTransition } from 'react'
import { View ,SafeAreaView, Text, Switch } from 'react-native'
import {List} from 'react-native-paper'
import { useState } from 'react'
import {EventRegister} from 'react-native-event-listeners'
import {Provider as PaperProvider} from 'react-native-paper'
import {LanguageSelector} from './../../../components/languageSelector/index'
import { useTranslation } from 'react-i18next'


export default function ProfileScreen(){
    const [isEnabled, setIsEnabled] = useState(false);
    const {t} = useTransition()

    return(
        <SafeAreaView>
            <Text>Beállítások
            </Text>
            <List.Section>
                <List.Item title="Sötét mód" right={() => <Switch onValueChange={() => {setIsEnabled((value)=> !value)
                EventRegister.emit("changeTheme",isEnabled)
                }} value={isEnabled}/>}/>
            </List.Section>
            <LanguageSelector></LanguageSelector>
        </SafeAreaView>

    )
}