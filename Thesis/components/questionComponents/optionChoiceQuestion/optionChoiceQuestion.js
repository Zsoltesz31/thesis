import React, {useState} from 'react'
import { useEffect } from 'react'
import {Text,Pressable,View,FlatList} from 'react-native'
import { OptionChoiceQuestionStyle } from './style'
import { useSelector,useDispatch } from 'react-redux'
import { RadioButton } from 'react-native-paper'



export const OptionChoiceQuestion=({questionId,questionData}) => {
    const dispatch = useDispatch()
    const [value,setValue] = useState(null)


    const Item = ({item,check}) => (

        <RadioButton.Group onValueChange={newValue=>setValue(newValue)} value={value}>
        <View style={OptionChoiceQuestionStyle.radioButtonContainer}>
        <Text style={OptionChoiceQuestionStyle.answerText}>{item.text}</Text>
        <RadioButton value={item.text} style={OptionChoiceQuestionStyle.radioButton} color={'#009AB9'} uncheckedColor={'#009AB9'}/>
        </View>
        </RadioButton.Group>

    )

    const renderItem=({item,checked,setChecked}) =>{

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
            <FlatList
            data={questionData.answers}
            renderItem={renderItem}
            keyExtractor={item=>item.id.toString()}
            />
        </View>
    )
}