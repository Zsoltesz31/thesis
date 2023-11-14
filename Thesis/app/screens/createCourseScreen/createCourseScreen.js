import React, {useState,useContext,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { SafeAreaView,View,Text,Pressable,ActivityIndicator} from 'react-native'
import CustomHeader from '../../../components/header/header'
import { CustomButton } from '../../../components/buttons/buttons'
import { CustomInput } from '../../../components/inputs/inputs'
import { CreateCourseScreenStyle } from './style'
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../../context/AuthContext'
import { useTranslation } from 'react-i18next'
import { createCourse,updateCourse,getCoursesByOwnerId } from '../../../slices/courseSlice'



export default function CreateCourseScreen({route,navigation}){
    const dispatch = useDispatch()
    const {userData} = useContext(AuthContext)
    const editMode = route.params.editMode
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [animating,setAnimating] = useState()
    const {t} = useTranslation()

    useEffect(()=>{
        if(editMode){
            setTitle(route.params.name)
            setDescription(route.params.desc)
        }
    },[])


    const handleAdd = async ()=>{
        let values = {
            title:title,
            description:description,
            ownerId:userData.id
        }
        await Promise.all([dispatch(createCourse(values))])
        navigation.replace('Kurzusaid')

    }

    const handleEdit = async () =>{
        let values = {
            title:title,
            description:description,
            ownerId:userData.id,
            courseId: route.params.id
        }

        await Promise.all([dispatch(updateCourse(values))]) 

        navigation.navigate('Kurzusaid')

    }


    if(editMode==false)
    {
    return(
        <SafeAreaView>
            <CustomHeader/>
            <View style={CreateCourseScreenStyle.titleContainer}>
                <Pressable style={CreateCourseScreenStyle.icon} onPress={()=>navigation.navigate('Kurzusaid')}><Ionicons name={'chevron-back-outline'} size={25} color={'white'}/></Pressable>
                <Text style={CreateCourseScreenStyle.title1}>{t('createCourse')}</Text>
            </View>
            <View style={CreateCourseScreenStyle.formContainer}>
                <Text style={CreateCourseScreenStyle.formTitle}>{t('courseData')}</Text>
                <CustomInput label={t('courseName')} onChangeTextEvent={text => setTitle(text)} outlineColor={'#009AB9'}></CustomInput>
                <CustomInput label={t('courseDesc')} onChangeTextEvent={text => setDescription(text)} outlineColor={'#009AB9'}></CustomInput>
                <CustomButton buttonName={t('create')} onPress={()=>handleAdd()}></CustomButton>
            </View>
        </SafeAreaView>
    )
    }else if(editMode==true){
        return(
        <SafeAreaView>
            <CustomHeader/>
            <View style={CreateCourseScreenStyle.titleContainer}>
                <Pressable style={CreateCourseScreenStyle.icon} onPress={()=>navigation.navigate('Kurzusaid')}><Ionicons name={'chevron-back-outline'} size={25} color={'white'}/></Pressable>
                <Text style={CreateCourseScreenStyle.title1}>{t('modifyCourse')}</Text>
            </View>
            <View style={CreateCourseScreenStyle.formContainer}>
                <Text style={CreateCourseScreenStyle.formTitle}>{t('courseData')}</Text>
                <CustomInput inputValue={title} label={t('courseName')} onChangeTextEvent={text => setTitle(text)} outlineColor={'#009AB9'}></CustomInput>
                <CustomInput inputValue={description} label={t('courseDesc')} onChangeTextEvent={text => setDescription(text)} outlineColor={'#009AB9'}></CustomInput>
                <CustomButton buttonName={t('modify')} onPress={()=>handleEdit()}></CustomButton>
                <ActivityIndicator size="large" color="#009AB9"/>
            </View>
        </SafeAreaView>
        )
    }
}