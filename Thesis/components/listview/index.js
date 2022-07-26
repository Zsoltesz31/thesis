import React, { useState } from 'react'
import { SafeAreaView, View, Text, ScrollView, TouchableOpcaity } from 'react-native'
import { TouchableHighlight } from 'react-native'
import {styles}  from './style'

export default function ListView(){
    const [testdata, setTestData] = useState([
        {course: 'test1', id:'1'},
        {course: 'test2', id:'2'},
        {course: 'test3', id:'3'},
    ])
    const onPress = () => console.log('hi')


    return(
        <ScrollView>
        <SafeAreaView>
            <View style={styles.container}>
           
            {testdata.map((item)=>{
                return(
                <TouchableHighlight onPress={onPress} underlayColor="#ffffff00" style={styles.toucheffect}>
                <View key={item.key} style={styles.listitem} elevation={2}>
                    <Text>{item.course}</Text>
                </View>
                </TouchableHighlight>
                )
            })}
            
            </View>
        </SafeAreaView>
        </ScrollView>
    )
}