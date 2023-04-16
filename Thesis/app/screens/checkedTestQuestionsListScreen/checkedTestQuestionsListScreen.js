import React,{useState} from 'react'
import { Pressable, SafeAreaView,Text,View } from 'react-native'
import CustomHeader from '../../../components/header/header'
import { CheckedTestQuestionListScreenStyle } from './style'
import { Ionicons } from '@expo/vector-icons';
import CheckedQuestionsList from '../../../components/checkedQuestions/checkedQuestions';


export default function CheckedTestQuestionsListScreen({navigation,route}){
    
    return(
        <SafeAreaView>
            <CustomHeader/>
            <View style={CheckedTestQuestionListScreenStyle.titleContainer}>
                <Pressable style={CheckedTestQuestionListScreenStyle.icon} onPress={()=>navigation.navigate('CheckedTestsScreen')}><Ionicons name={'chevron-back-outline'} size={25} color={'white'}/></Pressable>
                <Text style={CheckedTestQuestionListScreenStyle.title}>Kérdések kiértékelése</Text>
            </View>
            <CheckedQuestionsList data={route.params.answersAndQuestions}></CheckedQuestionsList>
        </SafeAreaView>
    )
}