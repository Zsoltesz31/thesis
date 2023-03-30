import React, { useEffect, useState, useRef,useContext } from 'react'
import { SafeAreaView, Text,Pressable,View,ScrollView } from 'react-native'
import {CustomInput} from '../../../components/inputs/inputs'
import {CustomButton} from '../../../components/buttons/buttons'
import {ConfirmationModal} from "../../../components/modals/confirmation_modal"
import { mainScreenStyle } from './mainscreenStyle'
import CustomListView from '../../../components/listview/index'
import CustomHeader from '../../../components/header/header'
import { AuthContext } from '../../../context/AuthContext'

import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'

const listTitle='Értesítések'

const DATA = [
    {
      id: '1',
      title: 'First Item',
      content: 'Content',
      sender:'Dr. Tamás Tamás'
    },
    {
      id: '2',
      title: 'Second Item',
      content: 'Content',
      sender:'Dr. Tamás Tamás'
    },
    {
      id: '3',
      title: 'Third Item',
      content: 'Content',
      sender:'Dr. Tamás Tamás'
    },
    {
        id: '4',
        title: 'First Item',
        content: 'Content',
        sender:'Dr. Tamás Tamás'
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
    const {userData} = useContext(AuthContext)

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
            <CustomHeader></CustomHeader>
            <Text style={mainScreenStyle.title}>{userData.id}</Text>
            <Text style={mainScreenStyle.welcomeTitle}>Üdvözöljük!</Text>
          
           <CustomListView data={DATA} listTitle={listTitle}></CustomListView>
           <CustomButton buttonName='Frissít'></CustomButton>
 

        </SafeAreaView>
    )
}