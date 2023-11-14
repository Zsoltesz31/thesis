import React,{useEffect, useState} from 'react'
import {View,Text,SafeAreaView,FlatList,Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import {CheckedQuestionsListStyle} from'./style'


export default function CheckedQuestionsList({data}){

    const QuestionItem = ({item}) => (
        <View style={CheckedQuestionsListStyle.listitem}>
        <Text style={CheckedQuestionsListStyle.listItemHeader}>Kérdés: {item.text}</Text>
        <View>
        <FlatList
        data = {item.answers}
        renderItem = {renderItemAnswersToQuestion}
        keyExtractor = {(item,index)=>index.toString()}
        />
        </View>
        </View>
        
    )

    const AnswerItem = ({item}) => (

        <View style={item.point>0 ?  CheckedQuestionsListStyle.listitemCorrect : CheckedQuestionsListStyle.listitemUnCorrect}>
        <Text style={CheckedQuestionsListStyle.listItemHeader}>Leadott válasz: {item.text}</Text>
        </View>
         
    )
    
    const renderItemQuestion=({item}) =>{
        return(
            <QuestionItem
            item={item}
            />
           
        )
    }

    const renderItemAnswersToQuestion=({item}) =>{
        console.log(item)
        return(
            <AnswerItem
            item={item}
            />
        )
    }


    return(
          <SafeAreaView style={CheckedQuestionsListStyle.container}>
            <FlatList
            data={data}
            renderItem={renderItemQuestion}
            keyExtractor = {(item,index)=>index.toString()}
            ></FlatList>
          </SafeAreaView>  
        
    )
    
}