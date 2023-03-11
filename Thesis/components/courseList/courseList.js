import React from 'react'
import {View,Text,SafeAreaView,FlatList,Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import {courseListStyle} from'./style'


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
    const renderItem=({item}) =>{
        return(
            <Item
            item={item}
            />
        )
    }
    return(
          <SafeAreaView style={courseListStyle.container}>
            <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor = {item=>item.id}
            ></FlatList>
          </SafeAreaView>  
    )
}