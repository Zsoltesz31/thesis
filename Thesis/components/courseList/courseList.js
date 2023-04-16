import React, { useEffect,useContext,useState } from 'react'
import {View,Text,SafeAreaView,FlatList,Pressable,Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import {courseListStyle} from'./style'
import { useSelector,useDispatch } from 'react-redux'
import { getAllCourses } from '../../slices/courseSlice';
import { getCoursesByUserId } from '../../slices/courseSlice';
import { getCoursesByOwnerId } from '../../slices/courseSlice';
import { deleteCourse } from '../../slices/courseSlice';
import { AuthContext } from '../../context/AuthContext';


export default function courseList({navigation}){
    const dispatch = useDispatch()
    const {courses,isLoading} = useSelector(store=>store.course)
    const {userData} = useContext(AuthContext)
    const [changeHappaned,setChangeHappaned] = useState(false)

    const onDeleteButtonPress = (id) => {
        Alert.alert(
          "Biztosan törli a kurzust?",
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
        <Pressable onPress={()=>navigation.navigate('CreateCourse',{editMode:true,name:item.name,desc:item.description,id:item.id})}><Ionicons name={'create-outline'} size={20} color={"white"}/></Pressable>
        <Pressable onPress={()=>onDeleteButtonPress(item.id)}><Ionicons name={'trash-outline'} size={20} color={"white"}/></Pressable>
        </View>
        </Pressable>
    )

    useEffect(()=>{
        if(userData.role=='STUDENT'){
        dispatch(getCoursesByUserId(userData.id))
        }
        else if(userData.role=='TEACHER'){
            dispatch(getCoursesByOwnerId(userData.id))
        }
        setChangeHappaned(false)
    },[changeHappaned])
    
    const renderItem=({item}) =>{
        return(
            <Item
            item={item}
            />
        )
    }

    const handleDelete = (id) =>{
        console.log(id)
        dispatch(deleteCourse(id)).then(setChangeHappaned(true))
    }


    if(courses.data==[])
    {
    return(

        <Text style={courseListStyle.noCoursesText}>Nincs elérhető kurzus!</Text>

    )
    }
    else{
    return(
          <SafeAreaView style={courseListStyle.container}>
            <FlatList
            data={courses.data}
            renderItem={renderItem}
            keyExtractor = {item=>item.id.toString()}
            ></FlatList>
          </SafeAreaView>  
        
    )
    }
}