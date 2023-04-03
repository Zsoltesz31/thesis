import React, {useState} from 'react'
import { useEffect } from 'react'
import {Text,Pressable,View,FlatList} from 'react-native'
import { MultipleOptionQuestionStyle } from './style'
import { useDispatch,useSelector } from 'react-redux'
import { getAnwser } from '../../../slices/answerSlice'
import { Checkbox } from 'react-native-paper'

// A VÁLASZ OBJECTET MÓDOSÍTJUK LOKÁLISAN MAJD EGY ÚJ MEZŐVEL AMI TÁROLJA HOGY IGAZ VAGY SEM A CHECKBOX STÁTUSZA

const dummyDATA = [
    {
        id:1,
        answer:'ASDASD',
        checked:false
    },
    {
        id:2,
        answer:'ASDASDASDASD',
        checked:true
    }
]


export const MultipleOptionQuestion=({getAnwsers,questionId,questionText}) => {
    const [checked,setChecked] =useState(dummyDATA)
    const [answer,setAnswer] = useState([])
    const dispatch=useDispatch()
    const {answers} =useSelector((state)=>state.answer)



    useEffect(()=>{
        dispatch(getAnwser(questionId))
    },[])

    const toggleCheckbox = (index) => {

        const checkboxData = [...checked];
        checkboxData[index].checked = !checkboxData[index].checked;
        setChecked(checkboxData);
      }

      const onButtonPress = () => {

        const selectedCheckBoxes = checkboxes.find((cb) => cb.checked === true);
        // selectedCheckBoxes will have checboxes which are selected to export answers as well
      }
    

    const Item = ({item}) => (

        <Pressable onPress={()=>console.log(checked[item.id-1].checked)}  android_ripple="true">
        <View style={MultipleOptionQuestionStyle.checkBoxContainer}>
            <Text style={MultipleOptionQuestionStyle.checkBoxText}>{item.answer}</Text>
            <Checkbox status={checked[item.id-1].checked ? 'checked' : 'unchecked'} onPress={()=>{toggleCheckbox(item.id-1)}} color={'#009AB9'} uncheckedColor={'#009AB9'}></Checkbox>
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
            <Text  style={MultipleOptionQuestionStyle.questionTitle}>KÉRDÉS</Text>
            <FlatList
            showsHorizontalScrollIndicator={false}
            data={dummyDATA}
            renderItem={renderItem}
            keyExtractor = {item=>item.id.toString()}
            ></FlatList>
        </View>
    )
}