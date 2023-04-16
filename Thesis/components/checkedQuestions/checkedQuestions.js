import React,{useEffect, useState} from 'react'
import {View,Text,SafeAreaView,FlatList,Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import {CheckedQuestionsListStyle} from'./style'


export default function CheckedQuestionsList({data}){

    const Item = ({item}) => (
        <Pressable onPress={()=>console.log('semmi')} android_ripple="true">
        <View style={item.selectedAnswer[0].point>0 ?  CheckedQuestionsListStyle.listitemCorrect : CheckedQuestionsListStyle.listitemUnCorrect}>
        <Text style={CheckedQuestionsListStyle.listItemHeader}>Kérdés: {item.question.text}</Text>
        <Text style={CheckedQuestionsListStyle.listItemHeader}>Leadott válasz: {item.selectedAnswer[0].text}</Text>
        </View>
        </Pressable>
        
    )

    
    const renderItem=({item}) =>{
        return(
            <Item
            item={item}
            />
           
        )
    }
    return(
          <SafeAreaView style={CheckedQuestionsListStyle.container}>
            <FlatList
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={renderItem}
            keyExtractor = {(item,index)=>index.toString()}
            ></FlatList>
          </SafeAreaView>  
        
    )
    
}