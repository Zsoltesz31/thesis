import React,{useState,useCallback} from "react";
import {View,Text,Switch} from 'react-native'
import { DarkModeSwitchStyle } from "./style";
import { useTranslation } from "react-i18next";



export default function DarkModeSwitch(){
const [isEnabled,setIsEnabled] = useState(false)
const {t} = useTranslation()

const toggleDarkModeOn = () => setIsEnabled(previousState => !previousState)

return(
<View style={DarkModeSwitchStyle.container}>
    <Text style={DarkModeSwitchStyle.text}>{t('darkMode')}</Text>
   <Switch
   value={isEnabled}
   onValueChange={toggleDarkModeOn}
   trackColor={{true:'white'}}
   thumbColor={'gray'}
   style={DarkModeSwitchStyle.switch}
   />
</View>
)
}