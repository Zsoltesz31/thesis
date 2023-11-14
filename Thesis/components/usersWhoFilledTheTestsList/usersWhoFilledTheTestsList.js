import React,{useEffect, useState} from 'react'
import {View,Text,SafeAreaView,FlatList,Pressable } from 'react-native'
import {CheckedQuestionsListStyle} from'./style'
import {useSelector,useDispatch} from 'react-redux'
import { useTranslation } from 'react-i18next'
import { getStudentAnswersFromTeacherSide } from '../../slices/fillTestSlice'


export default function UsersWhoFilledTheTestsList({route,navigation,data,upcomingTestId}){
    const dispatch = useDispatch()
    const {t} = useTranslation()

    const handleClick = (uid,id) =>{
        let values = {
            uid:uid,
            id:id
        }
        dispatch(getStudentAnswersFromTeacherSide(values))
        navigation.navigate('QuestionAnswersForTeachersScreen')
    }

    const Item = ({item}) => (
        <Pressable onPress={()=>handleClick(item.user.id,upcomingTestId)} android_ripple="true">
        <View style={CheckedQuestionsListStyle.listitemCorrect}>
        <Text style={CheckedQuestionsListStyle.listItemHeader}>{t('userName')}: {item.user.firstName} {item.user.lastName}</Text>
        <Text style={CheckedQuestionsListStyle.listItemHeader}>{t('maxPoints')}: {item.maxPoints} </Text>
        <Text style={CheckedQuestionsListStyle.listItemHeader}>{t('reachedPoints')}: {item.reachedPoints} </Text>
        </View>
        </Pressable>
    )

    
    const renderItem=({item}) =>{
        console.log(item)
        return(
            <Item
            item={item}
            />
           
        )
    }
    return(
          <SafeAreaView style={CheckedQuestionsListStyle.container}>
            <FlatList
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={renderItem}
            keyExtractor = {(item,index)=>index.toString()}
            ></FlatList>
          </SafeAreaView>  
        
    )
    
}