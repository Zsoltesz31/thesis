import React, { useEffect,useState } from 'react'
import {View,Text,SafeAreaView,FlatList,Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import {answerListStyle} from'./style'
import { useSelector,useDispatch } from 'react-redux'
import { deleteAnswer,updateAnswer } from '../../slices/answerSlice';
import { ConfirmationModal } from '../modals/confirmation_modal';
import { CustomInput } from '../inputs/inputs';
import { CustomButton } from '../buttons/buttons';
import { Checkbox } from 'react-native-paper';
import { ModalInputsComponent } from '../modalInputsComponent/modalInputsComponent';


export default function AnswerList({navigation,data,changeHappened,questionId}){
    const dispatch=useDispatch()
    const [isModalVisible,setIsModalVisible] = useState(false)
    const {currentAddedQuestion} =useSelector((state)=>state.question)

    const handleDelete = (id) =>{
        dispatch(deleteAnswer(id)).then(changeHappened(true))
    }

    const handleEdit = (id,text,correct) =>{
        let values = {
            questionId:currentAddedQuestion.data.id,
            id:id,
            text:text,
            correct:correct
        }
        dispatch(updateAnswer(values))
        modalClose()
    }

    const modalClose = () =>{
        setIsModalVisible(false)
    }



    const Item = ({item}) => (
        <Pressable android_ripple="true"> 
        <View style={answerListStyle.listitem}>
        <Text style={answerListStyle.listItemHeader}>{item.text}</Text> 
        <Ionicons  name={item.correct ? 'checkmark-outline' : 'close-outline'} size={20} color={item.correct ? 'green':'red'}/>
        <Pressable onPress={()=>handleDelete(item.id)} style={answerListStyle.buttonTest}><Ionicons  name={'trash-outline'} size={20} color={"white"}/></Pressable>
        <Pressable onPress={()=>setIsModalVisible(true)} style={answerListStyle.buttonTest}><Ionicons  name={'create-outline'} size={20} color={"white"}/></Pressable>
        <ConfirmationModal visible={isModalVisible} onClose={modalClose}>
        <ModalInputsComponent idToUpdate={item.id} handleFunction={handleEdit} answertext={item.text} checkedstatus={item.correct} ></ModalInputsComponent>
        </ConfirmationModal>
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
            data={data.data}
            renderItem={renderItem}
            keyExtractor={item=>item.id.toString()}
            ></FlatList>
          </SafeAreaView>  
        
    )
    }
}