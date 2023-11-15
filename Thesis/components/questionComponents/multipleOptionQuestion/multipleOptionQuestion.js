import React, {useState,useRef,useContext} from 'react'
import { useEffect } from 'react'
import {Text,Pressable,View,FlatList,Image} from 'react-native'
import { MultipleOptionQuestionStyle } from './style'
import { useDispatch,useSelector } from 'react-redux'
import { setFillAnswer } from '../../../slices/fillTestSlice'
import { AuthContext } from '../../../context/AuthContext'
import BASE_URL from '../../../config'

export const MultipleOptionQuestion=({questionId,questionData,fillAnswer,upcomingTestId}) => {
    const dispatch=useDispatch()
    const isMounted = useRef(false)
    const {userData} = useContext(AuthContext)
    const [answers,setAnswers] = useState([])

    useEffect(()=>{
        if(isMounted.current){
        handleFillAnswer()
        }else{
            isMounted.current=true
        }
    },[fillAnswer])

    const handleFillAnswer = () =>{
        for (let index = 0; index < answers.length; index++) {
            let values = {
                questionId:questionId,
                answerId:answers[index],
                upcomingTestId:upcomingTestId
            }
            dispatch(setFillAnswer(values))
        }
    }

    const getAnwser = (id) =>{
        if(!answers.includes(id))
        {
        setAnswers([
            ...answers,
                id    
        ])
        }
        else{
            console.log('BEJÖVÖK')
           setAnswers(
            answers.filter(a=>a!==id)
           )
        }
       
    }

    const Item = ({item}) => (
        <Pressable onPress={()=>{getAnwser(item.id),console.log(answers)}}  android_ripple="true">
        <View style={answers.includes(item.id) ? MultipleOptionQuestionStyle.checkBoxContainer : MultipleOptionQuestionStyle.checkBoxContainerNotIn}>
            <Text style={answers.includes(item.id) ? MultipleOptionQuestionStyle.checkBoxTextIn : MultipleOptionQuestionStyle.checkBoxText}>{item.text}</Text>
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
        <View style={MultipleOptionQuestionStyle.questionContainer}>
            <Text  style={MultipleOptionQuestionStyle.questionTitle}>{questionData.text}</Text>
            <View style={MultipleOptionQuestionStyle.iamgecontainer}>
            {questionData.QuestionImage?.source &&
            <Image
            style={{
                width:100,
                height:100,
            }}
            source={{uri:BASE_URL +'question/image/'+questionData.QuestionImage?.source}}
            />
           
            }
            </View>
            <View style={MultipleOptionQuestionStyle.listContainer}>
            <FlatList
            showsHorizontalScrollIndicator={false}
            data={questionData.Answers}
            renderItem={renderItem}
            keyExtractor = {item=>item.id.toString()}
            ></FlatList>
            </View>
        </View>
    )
}