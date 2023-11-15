import React, {useState,useContext,useRef} from 'react'
import { useEffect } from 'react'
import {Text,Pressable,View,FlatList,Image} from 'react-native'
import { OptionChoiceQuestionStyle } from './style'
import { useSelector,useDispatch } from 'react-redux'
import { RadioButton } from 'react-native-paper'
import { setFillAnswer } from '../../../slices/fillTestSlice'
import { AuthContext } from '../../../context/AuthContext'
import BASE_URL from '../../../config'



export const OptionChoiceQuestion=({questionId,questionData,fillAnswer,upcomingTestId}) => {
    const dispatch = useDispatch()
    const [value,setValue] = useState(null)
    const [answerId,setAnswerId] = useState(null)
    const [answer,setAnswer] = useState('')
    const {userData} = useContext(AuthContext)
    const isMounted = useRef(false)
    console.log(questionData.QuestionImage?.source)
    useEffect(()=>{
        if(isMounted.current){
        handleFillAnswer()
        }else{
            isMounted.current=true
        }
    },[fillAnswer])

    const handleFillAnswer = () =>{
        let values = {
            questionId:questionId,
            answerId:answerId,
            upcomingTestId:upcomingTestId
        }
        dispatch(setFillAnswer(values))
    }


    const Item = ({item,check}) => (

        <RadioButton.Group onValueChange={newValue=>{
            setValue(newValue)

            setAnswerId(newValue)
        }} value={value}>
        <View style={OptionChoiceQuestionStyle.radioButtonContainer}>
        <Text style={OptionChoiceQuestionStyle.answerText}>{item.text}</Text>
        <RadioButton value={item.id} style={OptionChoiceQuestionStyle.radioButton} color={'#009AB9'} uncheckedColor={'#009AB9'}/>
        </View>
        </RadioButton.Group>

    )

    const renderItem=({item,checked}) =>{

        return(
            <Item
            item={item}
            check={checked}
            />
        )
    }


    return(
        <View style={OptionChoiceQuestionStyle.questionContainer}>
            <Text  style={OptionChoiceQuestionStyle.questionTitle}>{questionData.text}</Text>
            <View style={OptionChoiceQuestionStyle.iamgecontainer}>
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
            <FlatList
            data={questionData.Answers}
            renderItem={renderItem}
            keyExtractor={item=>item.id.toString()}
            />
        </View>
    )
}