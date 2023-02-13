import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text,Pressable,View } from 'react-native'
import { useTheme } from 'react-native-paper'
import {CustomInput} from '../../../components/inputs/inputs'
import {CustomButton} from '../../../components/buttons/buttons'
import { fetchApi } from "./../../../actions/fetchApi"
import { useSelector } from 'react-redux'
import {ConfirmationModal} from "../../../components/modals/confirmation_modal"

import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'

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

export default function MainScreen(){
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
        <SafeAreaView>
        <ConfirmationModal modaltitle="Ezaz" visible={visible} stateChanger={setVisible}></ConfirmationModal> 
           <CustomInput placeholder="asd"></CustomInput>
           <CustomButton buttonName="asd"></CustomButton>
           <Text>asd</Text>
           <Pressable
           onPress={()=>openModal()
           }>
            <Text>Teszt</Text>
           </Pressable>
           <Pressable
           onPress={async()=>{
            await pushNotification(expoPushToken)
           }}>
            <Text>NotiTeszt</Text>
           </Pressable>
           <Text>Title: {notification && notification.request.content.title}</Text>
        </SafeAreaView>
    )
}