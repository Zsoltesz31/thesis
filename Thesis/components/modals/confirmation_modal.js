import React, {useState} from "react"
import {Alert, Modal, StyleSheet, Text, Pressable, View} from "react-native";
import { styles } from "../modals/confirmation_modal_styles";
import { Ionicons } from '@expo/vector-icons';

export const ConfirmationModal =({onClose,children,visible}) => {


    return(
        <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        >
        <View style={styles.modalContent}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Teszt elkezdése</Text>
                    <Pressable onPress={onClose}>
                        <Ionicons name="close-circle-outline" color="#fff" size={22} />
                    </Pressable>
                </View>
            {children}
        </View>
        </Modal>
    )

}