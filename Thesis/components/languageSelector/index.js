import React from "react";
import {View,Text,Pressable,StyleSheet} from 'react-native'
import { useTranslation } from "react-i18next";

const LANGUAGES = [
    {code:'hu',label:'Hungarian'},
    {code:'en',label:'English'}
]
const LanguageSelector = () =>{
    const {i18n} = useTranslation()
    const selectedLanguageCode = i18n.language

    const setLanguage = (code) =>{
        return i18n.changeLanguage(code)
    }


return(
<View>
    <View>
        <Text>Válasz nyelvet</Text>
    </View>
    {LANGUAGES.map(language =>{
        const selectedLanguage = language.code === selectedLanguageCode
        return(
            <Pressable
            key={language.code}
            disabled={selectedLanguage}
            onPress={()=>setLanguage(language.code)}
            >
                <Text>{language.label}</Text>
            </Pressable>
        )
    })}
</View>

)
}