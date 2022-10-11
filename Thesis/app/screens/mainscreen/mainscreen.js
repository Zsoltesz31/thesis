import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text,Pressable,View } from 'react-native'
import { useTheme } from 'react-native-paper'
import {CustomInput} from '../../../components/inputs/inputs'
import {CustomButton} from '../../../components/buttons/buttons'
import { fetchApi } from "./../../../actions/fetchApi"
import { useSelector } from 'react-redux'
import {ConfirmationModal} from "../../../components/modals/confirmation_modal"

export default function MainScreen(){
    const [visible,setVisible] = useState(false)

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
           
        </SafeAreaView>
    )
}