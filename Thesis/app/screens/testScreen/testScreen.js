import React,{useState} from 'react'
import { Pressable, SafeAreaView,Text,View } from 'react-native'
import CustomHeader from '../../../components/header/header'
import { testEndScreenStyle } from './style'
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../../../components/buttons/buttons';
import { ConfirmationModal } from '../../../components/modals/confirmation_modal';


export default function TestScreen({navigation,route}){

    return(
        <SafeAreaView>
            <CustomHeader/>
            <View style={testEndScreenStyle.titleContainer}>
                <Pressable style={testEndScreenStyle.icon} onPress={()=>navigation.navigate('TestSheet',{testId:route.params.testId,testName:route.params.testName,courseId:route.params.courseId})}><Ionicons name={'chevron-back-outline'} size={25} color={'white'}/></Pressable>
                <Text style={testEndScreenStyle.title}>Teszt befejezése</Text>
            </View>
        </SafeAreaView>
    )
}