import React,{useEffect, useState} from 'react'
import {View,Text,SafeAreaView,FlatList,Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import {checkedTestsListStyle} from'./style'
import { getStudentGivenAnswers } from '../../slices/fillTestSlice';
import { useSelector,useDispatch } from "react-redux";




export default function CheckedTestList({navigation,data,route}){
    const dispatch = useDispatch()

    const handleClick = async (id) =>{
        await Promise.all([dispatch(getStudentGivenAnswers(id))])
        navigation.navigate('CheckedTestQuestionsListScreen')
    }

    const Item = ({item,acquiredPoint,date}) => (
        <Pressable onPress={()=>handleClick(item.upComingTest.id)} android_ripple="true">
        <View style={checkedTestsListStyle.listitem}>
        <Text style={checkedTestsListStyle.listItemHeader}>Teszt neve: {item.upComingTest.test.title}</Text>
        <Text style={checkedTestsListStyle.listItemHeader}>Teszt leírása: {item.upComingTest.test.description}</Text>
        <Text style={checkedTestsListStyle.listItemHeader}>Maximum pontok: {item.maxPoints}</Text>
        <Text style={checkedTestsListStyle.listItemHeader}>Elért pontok: {item.reachedPoints}</Text>
        <Text style={checkedTestsListStyle.listItemHeader}>Leadás időpontja: {date}</Text>
        <View style={checkedTestsListStyle.listCrudButtons}>
        </View>
        </View>
        </Pressable>
        
    )

    
    const renderItem=({item}) =>{
        
        let date = new Date(item.endDate)
        let acquiredPoint =0
        for (let index = 0; index < item.length; index++) {
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
            data={data}
            renderItem={renderItem}
            keyExtractor = {(item,index)=>index.toString()}
            ></FlatList>
          </SafeAreaView>  
        
    )
    
}