import React from 'react'
import {View,Switch,Text} from 'react-native'
import {  } from 'react-native-paper'
import {switchStyle} from './style'


export const CustomSwitch=({label,onValueChangeEvent,onChangeEvent,value}) => {
    return(
        <View style={switchStyle.container}>
            <Text style={switchStyle.switchTitle}>{label}</Text>
            <Switch style={switchStyle.switch} onValueChange={onValueChangeEvent} onChange={onChangeEvent} value={value} trackColor={{true:'#00B0D4'}} thumbColor={value ? '#00BAE0' : '#f4f3f4'}></Switch>
        </View>

   
    )
}

