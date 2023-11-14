import React,{useState,useEffect,useContext} from 'react'
import { Pressable, SafeAreaView,Text,View } from 'react-native'
import CustomHeader from '../../../components/header/header'
import { testListScreenStyle } from './style'
import { Ionicons } from '@expo/vector-icons';
import {useSelector,useDispatch} from 'react-redux'
import { useTranslation } from 'react-i18next'
import UsersWhoFilledTheTestsList from '../../../components/usersWhoFilledTheTestsList/usersWhoFilledTheTestsList';



export default function FilledTestListinForTeachers({navigation,route}){
    const {t} = useTranslation()
    const {whoFilledTheTests} = useSelector((state)=>state.fill)


    return(
        <SafeAreaView>
            <CustomHeader/>
            <View style={testListScreenStyle.titleContainer}>
                <Pressable style={testListScreenStyle.icon} onPress={()=>navigation.goBack()}><Ionicons name={'chevron-back-outline'} size={25} color={'white'}/></Pressable>
                <Text style={testListScreenStyle.title}>{t('testFillers')}</Text>
            </View>
            <View style={testListScreenStyle.listContainer}>
            <UsersWhoFilledTheTestsList data={whoFilledTheTests} upcomingTestId={route.params.upcomingTestId} navigation={navigation}></UsersWhoFilledTheTestsList>

        </View>
        </SafeAreaView>
    )
}