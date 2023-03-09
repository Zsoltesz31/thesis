import React,{useState,useCallback} from "react";
import {View,Text,Pressable,StyleSheet} from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import { useTranslation } from "react-i18next";


export default function LanguageSelector(){
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [selected,setSelected] = useState("")
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
    valueField="value"
    placeholder="Válassza ki az alkalmazás nyelvét"
    />
</View>
)
}