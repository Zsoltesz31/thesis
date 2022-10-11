import React, {useState} from "react"
import {Alert, Modal, StyleSheet, Text, Pressable, View} from "react-native";
import { styles } from "../modals/confirmation_modal_styles";

export const ConfirmationModal =({stateChanger,modaltitle,handleclick,visible}) => {


    return(
        <View style={styles.centeredView}>
            <Modal
            animationType="slide"
            transparent={false}
            visible={visible}
            onRequestCLose={()=>{
                Alert.alert("Modal has been closed")
                setVisible(!visible)
            }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{modaltitle}</Text>
                        <Pressable style={[styles.button,styles.buttonClose]}
                        onPress={()=> stateChanger(!visible)}>
                            <Text style={styles.textStyle}>Igen</Text>
                        </Pressable>
                        <Pressable style={[styles.button,styles.buttonClose]}
                         onPress={handleclick}>
                            <Text style={styles.textStyle}>Nem</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    )

}