import React, {useState} from 'react'
import { useEffect } from 'react'
import {Text,Pressable,View,FlatList} from 'react-native'
import { OptionChoiceQuestionStyle } from './style'


const data = [
    {
        id:1,
        answer:'elso valasz'
    },
    {
        id:2,
        answer:'masodik valasz'
    },
    {
        id:3,
        answer:'harmadik valasz'
    },
    {
        id:4,
        answer:'negyedik valasz'
    },

]

export const OptionChoiceQuestion=({getAnwsers}) => {
    const [answer,setAnswer] = useState([])
    const [clicked,setClicked] = useState(data.map(data=>false))



    useEffect(()=>{
        //console.log(clicked)
        console.log(answer)
    },[clicked])

    const handleAddAnswer = (answerId,index)=>{
        handleClicked(index)
        let foundItem = data.find(element=>element.id==answerId).answer
        setAnswer(foundItem)
        getAnwsers(answer)
    }
    
    const handleClicked = (index)=>{
        setClicked(prev=>prev.map((element,idx)=>{
            if(idx===index-1){
                return( 
                !element       
                )
            }else if(!idx===index-1){
                return element 
            }
        }))
    }

    const Item = ({item}) => (
        clicked[item.id-1]  ? (
        <Pressable onPress={()=>handleAddAnswer(item.id,item.id)}  android_ripple="true">
        <View style={OptionChoiceQuestionStyle.answerSelectedContainer}>
        <Text style={OptionChoiceQuestionStyle.answerSelectedTExt}>{item.answer}</Text>
        </View>
        </Pressable>
        ) : (
        <Pressable onPress={()=>handleAddAnswer(item.id,item.id)} android_ripple="true">
        <View style={OptionChoiceQuestionStyle.answerContainer}>
        <Text style={OptionChoiceQuestionStyle.answerText}>{item.answer}</Text>
        </View>
        </Pressable>
        )
        
        
    )

    const renderItem=({item}) =>{
        return(
            <Item
            item={item}
            />
        )
    }


    return(
        <View style={OptionChoiceQuestionStyle.questionContainer}>
            <Text  style={OptionChoiceQuestionStyle.questionTitle}>Kérdés szövege</Text>
            <FlatList
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={renderItem}
            keyExtractor = {item=>item.id.toString()}
            ></FlatList>
        </View>
    )
}