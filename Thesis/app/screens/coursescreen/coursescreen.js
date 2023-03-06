import React from 'react'
import { SafeAreaView,Text } from 'react-native'
import { Button} from 'react-native-paper'
import ListView from '../../../components/listview/index'
import CustomHeader from '../../../components/header/header'

export default function CourseScreen({route,navigation}){
    return(
        <SafeAreaView>
           <CustomHeader title={route.params.HeaderText}></CustomHeader>
            <Button mode="contained"  theme={{roundness:30}} onPress={()=> {navigation.navigate('Teszt létrehozása')}}>Tesztek</Button>
        </SafeAreaView>
    )
}