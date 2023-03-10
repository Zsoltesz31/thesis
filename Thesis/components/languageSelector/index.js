import React,{useState,useCallback} from "react";
import {View,Text,Pressable,StyleSheet} from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import { useTranslation } from "react-i18next";


export default function LanguageSelector(){
    const LANGUAGES = [
        {code:'hu',label:'Hungarian'},
        {code:'eng',label:'English'}
    ]


    const {i18n} = useTranslation()
    const selectedLanguageCode = i18n.language
    console.log(i18n.language)
    const setLanguage = (code) =>{
        return i18n.changeLanguage(code)
    }



return(
<View>
    <Dropdown
    data={LANGUAGES}
    labelField='label'
    valueField="code"
    value={(LANGUAGES.find(element=>element.code===selectedLanguageCode))}
    placeholder="Válassza ki az alkalmazás nyelvét"
    selectedTextStyle={{color:'white',fontWeight:'bold'}}
    onChange = {item=>{ setLanguage(item.code)
    }}
    containerStyle={{width:330,borderRadius:20,color:'white',borderRadius:25}}
    style={{width:330,}}
    activeColor='#00B0D4'
    itemContainerStyle={{backgroundColor:'#009AB9'}}
    itemTextStyle={{color:'white',fontWeight:'bold'}}
    />
</View>
)
}