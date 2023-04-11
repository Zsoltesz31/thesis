import React, { useEffect,useContext } from 'react'
import {View,Text,SafeAreaView,FlatList,Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import {courseListStyle} from'./style'
import { useSelector,useDispatch } from 'react-redux'
import { fetchPosts } from '../../slices/courseSlice';
import { AuthContext } from '../../context/AuthContext';


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




export default function courseList({navigation}){
    const dispatch = useDispatch()
    const {posts,isLoading} = useSelector(store=>store.course)
    const {userData} = useContext(AuthContext)
    const Item = ({item}) => (
        <Pressable onPress={()=>navigation.navigate('Tesztek',{testListMode:userData.role=='TEACHER' ? 'Tests' : 'upComingTests'})} android_ripple="true"> 
        <View style={courseListStyle.listitem}>
        <Text style={courseListStyle.listItemHeader}>{item.title}</Text> 
        <Ionicons  name={'book-outline'} size={30} color={"white"}/>
        </View>
        </Pressable>
    )

    useEffect(()=>{
        dispatch(fetchPosts())
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