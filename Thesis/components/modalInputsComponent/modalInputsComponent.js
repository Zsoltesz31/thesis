import React, {useState} from "react"
import {Alert, Modal, StyleSheet, Text, Pressable, View} from "react-native";
import { ModalInputsComponentStyle } from "./style";
import { Ionicons } from '@expo/vector-icons';
import { CustomInput } from "../inputs/inputs";
import { CustomButton } from "../buttons/buttons";
import { Checkbox } from "react-native-paper";

export const ModalInputsComponent = ({idToUpdate,answertext,checkedstatus,handleFunction}) => {
    const [checked,setChecked] =useState(checkedstatus === 1 )
    const [answer,setAnswer] = useState(answertext)

    return(
        <View style={ModalInputsComponentStyle.modalContent}>
        <Text style={ModalInputsComponentStyle.modalTitle}>Válasz módosítása</Text>
                <CustomInput inputValue={answer} label={'Válasz'} outlineColor={'#009AB9'} onChangeTextEvent={text => setAnswer(text)}></CustomInput>
                <View style={ModalInputsComponentStyle.checkBoxContainer}>
                <Text style={ModalInputsComponentStyle.checkBoxText}>Helyes válasz:</Text>
                <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={()=>{setChecked(!checked)}} color={'#009AB9'} uncheckedColor={'#009AB9'}></Checkbox>
                </View>
                <CustomButton buttonName={'Válasz módosítása'} onPress={()=>handleFunction(idToUpdate,answer,checked)}></CustomButton>
        </View>
    )
}