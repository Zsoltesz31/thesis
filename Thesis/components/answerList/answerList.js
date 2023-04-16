import React, { useEffect,useState } from 'react'
import {View,Text,SafeAreaView,FlatList,Pressable,Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import {answerListStyle} from'./style'
import { useSelector,useDispatch } from 'react-redux'
import { deleteAnswer,updateAnswer } from '../../slices/answerSlice';
import { ConfirmationModal } from '../modals/confirmation_modal';
import { CustomInput } from '../inputs/inputs';
import { CustomButton } from '../buttons/buttons';
import { Checkbox } from 'react-native-paper';
import { ModalInputsComponent } from '../modalInputsComponent/modalInputsComponent';


export default function AnswerList({navigation,data,changeHappened,questionId,fullEditMode}){
    const dispatch=useDispatch()
    const [isModalVisible,setIsModalVisible] = useState(false)
    const {currentAddedQuestion} =useSelector((state)=>state.question)
    let answers = data.data

    const handleDelete = (id) =>{
        dispatch(deleteAnswer(id)).then(changeHappened(true))
    }

    const handleEdit = (id,text,correct) =>{
        let values = {
            questionId:fullEditMode? questionId:currentAddedQuestion.data.id,
            id:id,
            text:text,
            point:1
        }
        dispatch(updateAnswer(values)).then(changeHappened(true))
        modalClose()
    }

    const modalClose = () =>{
        setIsModalVisible(false)
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



    const Item = ({item}) => (
        <Pressable android_ripple="true"> 
        <View style={answerListStyle.listitem}>
        <Text style={answerListStyle.listItemHeader}>{item.text}</Text> 
        <Text style={answerListStyle.listItemHeader}>{item.point}</Text> 
        <Pressable onPress={()=>onDeleteButtonPress(item.id)} style={answerListStyle.buttonTest}><Ionicons  name={'trash-outline'} size={20} color={"white"}/></Pressable>
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


   
    return(
          <SafeAreaView style={answerListStyle.container}>
            <FlatList
            data={answers}
            renderItem={renderItem}
            keyExtractor={item=>item.id.toString()}
            ></FlatList>
          </SafeAreaView>  
        
    )
    
}