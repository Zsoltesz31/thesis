import React, {useState} from 'react'
import { useEffect } from 'react'
import {Text,Pressable,View,FlatList} from 'react-native'
import { MultipleOptionQuestionStyle } from './style'


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

export const MultipleOptionQuestion=({getAnwsers}) => {
    const [answer,setAnswer] = useState([])
    const [clicked,setClicked] = useState(data.map(data=>false))



    useEffect(()=>{
        console.log(clicked)
        console.log(answer)
    },[clicked])

    const handleAddAnswer = (answerId,index)=>{
        handleClicked(index)
        let foundItem = data.find(element=>element.id==answerId).answer
        console.log('FOUNDITEM:',foundItem)
        if(!answer.includes(foundItem))
        {
        setAnswer(current => [...current,foundItem])
        }
        else if(answer.includes(foundItem)){
            console.log(answer.includes(foundItem))
            let array = [...answer]
            let index = array.indexOf(foundItem)
            if(index!==-1){
                array.splice(index,1)
                setAnswer(array)
            }
        }
        getAnwsers(answer)

    }
    
    const handleClicked = (index)=>{
        setClicked(prev=>prev.map((element,idx)=>{
            if(idx===index-1){
                return !element
            }
            return element
        }))
    }

    const Item = ({item}) => (
        clicked[item.id-1]  ? (
        <Pressable onPress={()=>handleAddAnswer(item.id,item.id)}  android_ripple="true">
        <View style={MultipleOptionQuestionStyle.answerSelectedContainer}>
        <Text style={MultipleOptionQuestionStyle.answerSelectedTExt}>{item.answer}</Text>
        </View>
        </Pressable>
        ) : (
        <Pressable onPress={()=>handleAddAnswer(item.id,item.id)} android_ripple="true">
        <View style={MultipleOptionQuestionStyle.answerContainer}>
        <Text style={MultipleOptionQuestionStyle.answerText}>{item.answer}</Text>
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
        <View style={MultipleOptionQuestionStyle.questionContainer}>
            <Text  style={MultipleOptionQuestionStyle.questionTitle}>Kérdés szövege</Text>
            <FlatList
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={renderItem}
            keyExtractor = {item=>item.id.toString()}
            ></FlatList>
        </View>
    )
}