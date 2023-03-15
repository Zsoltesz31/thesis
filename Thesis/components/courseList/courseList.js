import React, { useEffect } from 'react'
import {View,Text,SafeAreaView,FlatList,Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import {courseListStyle} from'./style'
import { useSelector,useDispatch } from 'react-redux'
import { fetchPosts } from '../../slices/courseSlice';



const Item = ({item}) => (
    <Pressable onPress={()=>console.log('helo')} android_ripple="true"> 
    <View style={courseListStyle.listitem}>
    <Text style={courseListStyle.listItemHeader}>{item.title}</Text> 
    <Ionicons  name={'book-outline'} size={30} color={"white"}/>
    </View>
    </Pressable>
)

const data = [
    {
        id:1,
        title:'Programmozás módszertan'
    },
    {
        id:2,
        title:'Magasszintű programmozási nyelvek'
    },
    {
        id:3,
        title:'Webprogrammozás 1'
    }
]




export default function courseList(){
    const dispatch = useDispatch()
    const {posts,isLoading} = useSelector(store=>store.course)

    useEffect(()=>{
        dispatch(fetchPosts())
        console.log('asd')
    },[])
    
    const renderItem=({item}) =>{
        return(
            <Item
            item={item}
            />
        )
    }



    if(posts==[])
    {
    return(
        <Text>Nincs elérhető kurzosod</Text>
    )
    }
    else{
    return(
          <SafeAreaView style={courseListStyle.container}>
            <FlatList
            data={posts}
            renderItem={renderItem}
            keyExtractor = {item=>item.id.toString()}
            ></FlatList>
          </SafeAreaView>  
        
    )
    }
}