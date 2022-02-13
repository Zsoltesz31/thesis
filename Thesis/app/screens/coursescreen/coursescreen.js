import React from 'react'
import { SafeAreaView,Text } from 'react-native'
import { Button} from 'react-native-paper'

export default function CourseScreen({navigation}){
    return(
        <SafeAreaView>
            <Text>Kurzusok</Text>
            <Button mode="contained"  theme={{roundness:30}} onPress={()=> {navigation.navigate('Tesztek')}}>Tesztek</Button>
        </SafeAreaView>
    )
}