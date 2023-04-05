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

export default function MainScreen({route}){
    const {userData} = useContext(AuthContext)


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