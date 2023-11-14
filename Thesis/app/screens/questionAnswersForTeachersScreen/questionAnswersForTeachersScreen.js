import React from 'react'
import { Pressable, SafeAreaView,Text,View } from 'react-native'
import CustomHeader from '../../../components/header/header'
import { QuestionAnswersForTeachersScreenStyle } from './style'
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import CheckedQuestionsList from '../../../components/checkedQuestions/checkedQuestions';
import {useSelector} from 'react-redux'


export default function QuestionAnswersForTeachersScreen({navigation,route}){
    const {t} = useTranslation()
    const {testResultsByStudents} = useSelector((state)=>state.fill)
    

    return(
        <SafeAreaView>
            <CustomHeader/>
            <View style={QuestionAnswersForTeachersScreenStyle.titleContainer}>
                <Pressable style={QuestionAnswersForTeachersScreenStyle.icon} onPress={()=>navigation.goBack()}><Ionicons name={'chevron-back-outline'} size={25} color={'white'}/></Pressable>
                <Text style={QuestionAnswersForTeachersScreenStyle.title}>{t('evaluatedQuestions')}</Text>
            </View>
            <CheckedQuestionsList data={testResultsByStudents}></CheckedQuestionsList>
        </SafeAreaView>
    )
}