import React from 'react'
import {View,Text,SafeAreaView,FlatList,Pressable } from 'react-native'
import {testListStyle} from'./style'


const data = [
    {
        id:1,
        courseId:1,
        deadline:'10.16 00:00',
        title:'Programmozás módszertan'
    },
    {
        id:2,
        courseId:1,
        deadline:'10.16 00:00',
        title:'Magasszintű programmozási nyelvek'
    },
    {
        id:3,
        courseId:2,
        deadline:'10.16 00:00',
        title:'Webprogrammozás 1'
    },
    {
        id:4,
        courseId:2,
        deadline:'10.16 00:00',
        title:'Webprogrammozás 1'
    },
    {
        id:5,
        courseId:3,
        deadline:'10.16 00:00',
        title:'Webprogrammozás 1'
    }
]




export default function TestList({navigation,courseId}){
    

    const Item = ({item}) => (
        <Pressable onPress={()=>console.log(courseId)} android_ripple="true"> 
        <View style={testListStyle.listitem}>
        <Text style={testListStyle.listItemHeader}>{item.title}</Text> 
        <Text style={testListStyle.deadline}>Határidő: {item.deadline}</Text>
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
          <SafeAreaView style={testListStyle.container}>
            <FlatList
            data={data.filter(item=> item.courseId==courseId)}
            renderItem={renderItem}
            keyExtractor = {item=>item.id.toString()}
            ></FlatList>
          </SafeAreaView>  
        
    )
    
}