import React, { useEffect } from 'react'
import {View,Text,SafeAreaView,FlatList,Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import {answerListStyle} from'./style'
import { useSelector,useDispatch } from 'react-redux'
import { fetchPosts } from '../../slices/courseSlice';


const data = [
    {
        id:1,
        title:'Első válasz',
        correct:true
    },
    {
        id:2,
        title:'Második válasz',
        correct:false
    },
    {
        id:3,
        title:'Harmadik válasz',
        correct:false
    },
    {
        id:4,
        title:'Harmadik válasz',
        correct:false
    },
  
]




export default function AnswerList({navigation}){

    const Item = ({item}) => (
        <Pressable android_ripple="true"> 
        <View style={answerListStyle.listitem}>
        <Text style={answerListStyle.listItemHeader}>{item.title}</Text> 
        <Ionicons  name={item.correct ? 'checkmark-outline' : 'close-outline'} size={20} color={"white"}/>
        <Pressable style={answerListStyle.buttonTest}><Ionicons  name={'create-outline'} size={20} color={"white"}/></Pressable>
        <Pressable style={answerListStyle.buttonTest}><Ionicons  name={'trash-outline'} size={20} color={"white"}/></Pressable>
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



    if(data==[])
    {
    return(
        <Text>Még nincs hozzáadott válasz!</Text>
    )
    }
    else{
    return(
          <SafeAreaView style={answerListStyle.container}>
            <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor = {item=>item.id.toString()}
          
            ></FlatList>
          </SafeAreaView>  
        
    )
    }
}