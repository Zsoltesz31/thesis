import React, { useEffect,useContext,useState,useCallback } from 'react'
import {View,Text,SafeAreaView,FlatList,Pressable,Alert} from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import {courseListStyle} from'./style'
import { useSelector,useDispatch } from 'react-redux'
import { getCoursesByUserId } from '../../slices/courseSlice';
import { getCoursesByOwnerId } from '../../slices/courseSlice';
import { deleteCourse } from '../../slices/courseSlice';
import { AuthContext } from '../../context/AuthContext';


export default function courseList({navigation}){
    const dispatch = useDispatch()
    const {courses} = useSelector(store=>store.course)
    const {userData} = useContext(AuthContext)
    const [changeHappaned,setChangeHappaned] = useState(false)

    useFocusEffect(
      useCallback(()=>{
          if(userData.role=='STUDENT'){
            handleLoadCoursesForStudent()
          }
          else if(userData.role=='TEACHER'){
              handleLoadCoursesForTeacher()
          }
          setChangeHappaned(false)
      },[changeHappaned])
    )
    
   

    const onDeleteButtonPress = (id) => {
        Alert.alert(
          'Figyelmeztetés','Biztosan törli a kurzust?',
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
        <Pressable onPress={()=>navigation.navigate('Tesztek',{testListMode:'upComingTests',courseName:item.name,courseId:item.id})} android_ripple="true"> 
        <View style={courseListStyle.listitem}>
        <Text style={courseListStyle.listItemHeader}>{item.name}</Text> 
        <Pressable onPress={()=>navigation.navigate('CreateCourse',{editMode:true,name:item.name,desc:item.description,id:item.id})}><Ionicons name={'create-outline'} size={25} right={10} color={"white"}/></Pressable>
        <Pressable onPress={()=>onDeleteButtonPress(item.id)}><Ionicons name={'trash-outline'} size={25} color={"white"}/></Pressable>
        </View>
        </Pressable>
    )
    const Item2 = ({item}) => ( 
      <Pressable onPress={()=>navigation.navigate('Tesztek',{testListMode:'upComingTests',courseName:item.name,courseId:item.id})} android_ripple="true"> 
      <View style={courseListStyle.listitem}>
      <Text style={courseListStyle.listItemHeader}>{item.name}</Text> 
      </View>
      </Pressable>
  )
    
    const renderItem=({item}) =>{
      if(userData.role=='TEACHER'){  

      return(  
            <Item
            item={item}
            />
        )
      } else if(userData.role=='STUDENT') {
        return(
          <Item2
          item={item}
          />
        )
      }
    }

    const handleDelete = async (id) =>{
      await Promise.all([dispatch(deleteCourse(id))])
      setChangeHappaned(true)
    }

    const handleLoadCoursesForStudent = async () =>{
      await Promise.all([dispatch(getCoursesByUserId())])
    }
    const handleLoadCoursesForTeacher = async () =>{
      await Promise.all([dispatch(getCoursesByOwnerId())])
    }


    if(!courses?.data || courses.data == [])
    {
    return(

        <Text style={courseListStyle.noCoursesText}>Nincs elérhető kurzus!</Text>

    )
    }
    else{
    return(
          <SafeAreaView style={courseListStyle.container}>
            <FlatList
            data={courses?.data}
            renderItem={renderItem}
            keyExtractor = {item=>item.id.toString()}
            ></FlatList>
          </SafeAreaView>  
        
    )
    }
}