import React from 'react'
import { SafeAreaView, View, Text,TouchableOpcaity, Pressable } from 'react-native'
import { FlatList } from 'react-native'
import {styles}  from './style'

//TODO pressable opacity változtatási kattintás esetén WRAPPER component létrehozása szükséges a probléma megoldásához

const Item = ({item}) => (
    <Pressable onPress={()=>console.log('helo')} android_ripple="true"> 
    <View style={styles.listitem}>
        <Text>{item.title}</Text> 
        <Text>{item.content}</Text>    
    </View>
    </Pressable>
)

export default function CustomListView({data,listTitle}){
    const renderItem=({item}) =>{
        return(
            <Item
            item={item}
            />
        )
    }


    return(
      <SafeAreaView style={styles.container}>
        <Text>{listTitle}</Text>
        <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor = {item=>item.id}
        ></FlatList>
      </SafeAreaView>
    )
}