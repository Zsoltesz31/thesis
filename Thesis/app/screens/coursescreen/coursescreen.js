import React,{useContext} from 'react'
import { SafeAreaView,Text,View } from 'react-native'
import { Button} from 'react-native-paper'
import { coursescreenStyle } from './coursescreenStyle'
import { CustomButton } from '../../../components/buttons/buttons'
import CustomHeader from '../../../components/header/header'
import CourseList from '../../../components/courseList/courseList'
import { useTranslation } from 'react-i18next'
import { AuthContext } from '../../../context/AuthContext'


export default function CourseScreen({route,navigation}){
    const {userData} = useContext(AuthContext)
    const {t} = useTranslation()
    return(
        <SafeAreaView>
           <CustomHeader title={route.params.HeaderText}></CustomHeader>
            <View style={coursescreenStyle.container}>
            <View style={coursescreenStyle.titleContainer}>
           <Text style={coursescreenStyle.listTitle}>{t('yourCourses')}</Text>
           </View>
           <CourseList navigation={navigation}></CourseList>
           { userData.role=='TEACHER' &&
           <CustomButton buttonName={t('tests')} onPress={()=> navigation.navigate('Tesztek',{testListMode:'Tests'})}></CustomButton>
           }
            {userData.role=='TEACHER' && 
            <CustomButton buttonName={t('createCourse')} theme={{roundness:30}} onPress={()=> {navigation.navigate('CreateCourse',{editMode:false})}}></CustomButton>
            }
            </View>
        </SafeAreaView>
    )
}