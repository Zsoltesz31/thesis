import React from 'react'
import { SafeAreaView, Text } from 'react-native'
import { useTheme } from 'react-native-paper'

export default function MainScreen(){

    const {colors} = useTheme()
    return(
        <SafeAreaView>
            <Text style={{color: colors.test}}>asdasd</Text>
        </SafeAreaView>
    )
}