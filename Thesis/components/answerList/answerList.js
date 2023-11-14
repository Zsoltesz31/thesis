import React, { useState, useCallback } from 'react'
import {View,Text,SafeAreaView,FlatList,Pressable,Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import {answerListStyle} from'./style'
import { useSelector,useDispatch } from 'react-redux'
import { deleteAnswer,updateAnswer } from '../../slices/answerSlice';
import { ConfirmationModal } from '../modals/confirmation_modal';
import { ModalInputsComponent } from '../modalInputsComponent/modalInputsComponent';
import { useEffect } from 'react';


export default function AnswerList({navigation,data,changeHappened,questionId,fullEditMode}){
    const dispatch=useDispatch()
    const {currentAddedQuestion} = useSelector((state)=>state.question)
    const {answers} = useSelector(state => state.answer)

    const [isVisible, setVisible] = useState(false)
    const [editingAnswer, setEditingAnswer] = useState()


    const handleDelete = async (id) =>{
      await Promise.all([dispatch(deleteAnswer(id))])
      changeHappened(true)
    }

    const handleEdit = async (id,text,checked) =>{

        let values = {
            questionId:fullEditMode? questionId:currentAddedQuestion.data.id,
            id:id,
            text:text,
            point: checked ? 1 :0
        }
        await Promise.all([dispatch(updateAnswer(values))])
        changeHappened(true)
        closeModal()
    }

    const showModal = (answerId) => {
      setEditingAnswer(answers.find(a => a.id === answerId))
      setVisible(true)
    }


    const closeModal = () =>{
      setEditingAnswer(null)
      setVisible(false)
    }

    const onDeleteButtonPress = (id) => {
        Alert.alert(
          'Figyelmeztetés',
          "Biztosan törli a választ?",
          [
            {
              text: "Igen",
              style: "destructive",
              onPress: () => handleDelete(id),
            },
            {
              text: "Nem",
              style: "cancel",
            },
          ]
        );
      };  



    const Item = ({item}) => {
      return (
        
        <Pressable android_ripple="true"> 
        <View style={answerListStyle.listitem}>
        <Text style={answerListStyle.listItemHeader}>{item.text}</Text> 
        <Text style={answerListStyle.listItemHeader}>{item.point}</Text> 
        <Pressable onPress={()=>onDeleteButtonPress(item.id)} style={answerListStyle.buttonTest}><Ionicons name={'trash-outline'} size={20} color={"white"}/></Pressable>
        <Pressable onPress={()=>showModal(item.id)} style={answerListStyle.buttonTest}><Ionicons name={'create-outline'} size={20} color={"white"}/></Pressable>
        
        </View>
        </Pressable>
    )}
    
    const renderItem=({item}) =>{
        return(
            <Item
            item={item}
            />
        )
    }


   
    return(
          <SafeAreaView style={answerListStyle.container}>
            
            <FlatList
            data={answers}
            renderItem={renderItem}
            keyExtractor={item=>`${item.id.toString()}${isVisible[item.id]}`}
            extraData={answers}
            ></FlatList>
            
            { editingAnswer && 
              <ConfirmationModal visible={isVisible} onClose={() => closeModal()}>
              <ModalInputsComponent idToUpdate={editingAnswer.id} handleFunction={handleEdit} answertext={editingAnswer.text} checkedstatus={editingAnswer.point}></ModalInputsComponent>
              </ConfirmationModal>

            }

            
            
          </SafeAreaView>  
        
    )
    
}