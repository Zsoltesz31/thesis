import React from 'react'
import { SafeAreaView,Text,View } from 'react-native'
import { Button} from 'react-native-paper'
import { coursescreenStyle } from './coursescreenStyle'
import CustomHeader from '../../../components/header/header'
import CourseList from '../../../components/courseList/courseList'


export default function CourseScreen({route,navigation}){
    return(
        <SafeAreaView>
           <CustomHeader title={route.params.HeaderText}></CustomHeader>
            <View style={coursescreenStyle.container}>
           <Text style={coursescreenStyle.listTitle}>Kurzusaid</Text>
            <CourseList></CourseList>
            <Button mode="contained"  theme={{roundness:30}} onPress={()=> {navigation.navigate('Teszt létrehozása')}}>Tesztek</Button>
            </View>
        </SafeAreaView>
    )
}