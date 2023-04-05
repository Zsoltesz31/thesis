import React from 'react'
import { SafeAreaView,Text,View } from 'react-native'
import { Button} from 'react-native-paper'
import { coursescreenStyle } from './coursescreenStyle'
import { CustomButton } from '../../../components/buttons/buttons'
import CustomHeader from '../../../components/header/header'
import CourseList from '../../../components/courseList/courseList'
import { useTranslation } from 'react-i18next'


export default function CourseScreen({route,navigation}){
    const {t} = useTranslation()
    return(
        <SafeAreaView>
           <CustomHeader title={route.params.HeaderText}></CustomHeader>
            <View style={coursescreenStyle.container}>
           <Text style={coursescreenStyle.listTitle}>{t('yourCourses')}</Text>
           <CustomButton buttonName={t('publishedTests')} onPress={()=> navigation.navigate('Tesztek',{testListMode:'upComingTests'})}></CustomButton>
            <CourseList navigation={navigation}></CourseList>
            {route.params.loginType === 'teacher' &&
            <CustomButton buttonName='Kurzus létrehozása' theme={{roundness:30}} onPress={()=> {navigation.navigate('Teszt létrehozása')}}></CustomButton>
            }
            </View>
        </SafeAreaView>
    )
}