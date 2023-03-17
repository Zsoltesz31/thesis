import React from 'react'
import { Pressable, SafeAreaView,Text,View } from 'react-native'
import CustomHeader from '../../../components/header/header'
import { testListScreenStyle } from './style'
import { Ionicons } from '@expo/vector-icons';
import TestList from '../../../components/testList/testList'

export default function TestListScreen({navigation,route}){
    return(
        <SafeAreaView>
            <CustomHeader/>
            <View style={testListScreenStyle.titleContainer}>
                <Pressable style={testListScreenStyle.icon} onPress={()=>navigation.navigate('Kurzusaid')}><Ionicons name={'chevron-back-outline'} size={25} color={'white'}/></Pressable>
                <Text style={testListScreenStyle.title}>{route.params.courseId}</Text>
            </View>
            <View style={testListScreenStyle.listContainer}>
            <TestList navigation={navigation} courseId={route.params.courseId}></TestList>
            </View>
        </SafeAreaView>
    )
}