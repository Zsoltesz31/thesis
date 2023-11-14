import React,{useState,useEffect} from 'react'
import { Pressable, SafeAreaView,Text,View } from 'react-native'
import CustomHeader from '../../../components/header/header'
import { CheckedTestQuestionListScreenStyle } from './style'
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import CheckedQuestionsList from '../../../components/checkedQuestions/checkedQuestions';
import {useSelector,useDispatch} from 'react-redux'


export default function CheckedTestQuestionsListScreen({navigation,route}){
    const {answnersGivenByStudents} = useSelector((state)=>state.fill)
    const {t} = useTranslation()
    

    return(
        <SafeAreaView>
            <CustomHeader/>
            <View style={CheckedTestQuestionListScreenStyle.titleContainer}>
                <Pressable style={CheckedTestQuestionListScreenStyle.icon} onPress={()=>navigation.goBack()}><Ionicons name={'chevron-back-outline'} size={25} color={'white'}/></Pressable>
                <Text style={CheckedTestQuestionListScreenStyle.title}>{t('evaluatedQuestions')}</Text>
            </View>
            <CheckedQuestionsList data={answnersGivenByStudents}></CheckedQuestionsList>
        </SafeAreaView>
    )
}