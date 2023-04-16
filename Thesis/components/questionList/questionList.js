import React, { useEffect } from 'react'
import {View,Text,SafeAreaView,FlatList,Pressable,Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { questionListStyle } from './style';
import { useSelector,useDispatch } from 'react-redux'
import { deleteQuestion } from '../../slices/questionSlice';


export default function QuestionList({navigation,data,changeListener,testId,testName}){
    const dispatch=useDispatch()

    const handleDelete = (id) =>{
        dispatch(deleteQuestion(id)).then(changeListener(true))
    }

    const onDeleteButtonPress = (id) => {
        Alert.alert(
          'Figyelmeztetés',
          "Biztosan törli a kérdést?",
          [
            {
              text: "Igen",
              onPress: () => handleDelete(id),
            },
            {
              text: "Nem",
              onPress: () =>console.log('nem')
            },
          ]
        );
      };  


    const Item = ({item}) => (
        <Pressable android_ripple="true"> 
        <View style={questionListStyle.listitem}>
        <Text style={questionListStyle.listItemHeader}>{item.text}</Text> 
        <Text style={questionListStyle.listItemHeader}>{item.type}</Text> 
        <Pressable onPress={()=>onDeleteButtonPress(item.id)} style={questionListStyle.buttonTest}><Ionicons  name={'trash-outline'} size={20} color={"white"}/></Pressable>
        <Pressable onPress={()=>navigation.navigate("AddQuestionWithAnswer",{qestionText:item.text,questionType:item.type,FullEditMode:true,questionId:item.id,testId:testId,testName:testName})} style={questionListStyle.buttonTest}><Ionicons  name={'create-outline'} size={20} color={"white"}/></Pressable>
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
        <Text>Nincs hozzáadott kérdés!</Text>
    )
    }
    else{
    return(
          <SafeAreaView style={questionListStyle.container}>
            <FlatList
            data={data.data}
            renderItem={renderItem}
            keyExtractor={item=>item.id.toString()}
            ></FlatList>
          </SafeAreaView>  
        
    )
    }
}