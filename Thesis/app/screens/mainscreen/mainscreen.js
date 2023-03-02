import React, { useEffect, useState, useRef } from 'react'
import { SafeAreaView, Text,Pressable,View,ScrollView } from 'react-native'
import {CustomInput} from '../../../components/inputs/inputs'
import {CustomButton} from '../../../components/buttons/buttons'
import { fetchApi } from "./../../../actions/fetchApi"
import {ConfirmationModal} from "../../../components/modals/confirmation_modal"
import { mainScreenStyle } from './mainscreenStyle'
import CustomListView from '../../../components/listview/index'

import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'

const listTitle='Értesítések'

const DATA = [
    {
      id: '1',
      title: 'First Item',
      content: 'Content',
      link:'Click'
    },
    {
      id: '2',
      title: 'Second Item',
      content: 'Content',
      link:'Click'
    },
    {
      id: '3',
      title: 'Third Item',
      content: 'Content',
      link:'Click'
    },
   
  ];

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false
    })
})

async function pushNotification(pushtoken) {
    const message = {
        to: pushtoken,
        sound: 'default',
        title:'A title',
        body: 'A body',
        data: {someData: "data"}
    }

}

async function registerForNotificationAsync() {
    let token
    if(Device.isDevice) {
        const {status: existingStatus} = await Notifications.getPermissionsAsync()
        let finalStatus = existingStatus
        if(existingStatus!=='granted'){
            const {status} = await Notifications.requestPermissionsAsync()
            finalStatus=status
        }
        if(finalStatus !=='granted'){
            alert('Failed to get push token')
            return
        }
        token = (await Notifications.getExpoPushTokenAsync)
        console.log(token)  
    }
    else {
        alert('Must use physical device')
    }
    if(Platform.OS ==='android'){
        Notifications.setNotificationChannelAsync('default',{
            name:'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0,250,250,250],
            lightColor:'#FF231F7C'
        })
    }
    return token
}

export default function MainScreen({route}){
    const [visible,setVisible] = useState(false)
    const [expoPushToken, setExpoPushToken] = useState('')
    const [notification, setNotification] = useState(false)
    const notificationListener = useRef()
    const responseListener = useRef()

useEffect(()=>{
    registerForNotificationAsync().then(token =>setExpoPushToken(token))

    notificationListener.current=Notifications.addNotificationReceivedListener(notification =>{
        setNotification(notification)
    })
    responseListener.current=Notifications.addNotificationResponseReceivedListener(response=>{
        console.log(response)
    })
    return()=>{
        Notifications.removeNotificationSubscription(notificationListener.current)
        Notifications.removeNotificationSubscription(responseListener.current)
    }
})


const openModal=() => {
    setVisible(true)
}

    return(
        <SafeAreaView style={mainScreenStyle.container}>
            <Text style={mainScreenStyle.title}>{route.params.userName==='student' ? 'Tanároknak' : 'Hallgatóknak'}</Text>
            <Text style={mainScreenStyle.welcomeTitle}>Üdvözöljük {route.params.userName}!</Text>
            <ScrollView  showsVerticalScrollIndicator={false}>
           <CustomListView data={DATA} listTitle={listTitle}></CustomListView>
           </ScrollView>
           <CustomButton buttonName='Frissít'></CustomButton>

        </SafeAreaView>
    )
}