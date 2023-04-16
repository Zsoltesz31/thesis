import React,{useEffect, useState} from 'react'
import {View,Text,SafeAreaView,FlatList,Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import {checkedTestsListStyle} from'./style'




export default function CheckedTestList({navigation,data,route}){

    const Item = ({item,acquiredPoint,date}) => (
        <Pressable onPress={()=>{navigation.navigate('CheckedTestQuestionsListScreen',{answersAndQuestions:item.answersAndQuestions})}} android_ripple="true">
        <View style={checkedTestsListStyle.listitem}>
        <Text style={checkedTestsListStyle.listItemHeader}>Teszt neve: {item.test.title}</Text>
        <Text style={checkedTestsListStyle.listItemHeader}>Teszt leírása: {item.test.description}</Text>
        <Text style={checkedTestsListStyle.listItemHeader}>Maximum pontok: {item.maxPoint}</Text>
        <Text style={checkedTestsListStyle.listItemHeader}>Elért pontok: {acquiredPoint}</Text>
        <Text style={checkedTestsListStyle.listItemHeader}>Leadás időpontja: {date}</Text>
        <View style={checkedTestsListStyle.listCrudButtons}>
        </View>
        </View>
        </Pressable>
        
    )

    
    const renderItem=({item}) =>{
        let date = new Date(item.filledTest.endDate)
        let acquiredPoint =0
        for (let index = 0; index < item.answersAndQuestions.length; index++) {
            acquiredPoint=acquiredPoint+item.answersAndQuestions[index].selectedAnswer[0].point
 
        }
       
        return(
            <Item
            item={item}
            acquiredPoint={acquiredPoint}
            date={date.getFullYear() + '-' + (date.getMonth()+1<10 ? ('0' + (date.getMonth()+1)) : date.getMonth()+1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()}
            />
           
        )
    }
    return(
          <SafeAreaView style={checkedTestsListStyle.container}>
            <FlatList
            showsHorizontalScrollIndicator={false}
            data={data.data}
            renderItem={renderItem}
            keyExtractor = {(item,index)=>index.toString()}
            ></FlatList>
          </SafeAreaView>  
        
    )
    
}