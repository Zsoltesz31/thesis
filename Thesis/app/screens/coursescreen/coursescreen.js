import React from 'react'
import { SafeAreaView,Text } from 'react-native'
import { Button} from 'react-native-paper'
import ListView from '../../../components/listview/index'

export default function CourseScreen({navigation}){
    return(
        <SafeAreaView>
           
            <Button mode="contained"  theme={{roundness:30}} onPress={()=> {navigation.navigate('Teszt létrehozása')}}>Tesztek</Button>
        </SafeAreaView>
    )
}