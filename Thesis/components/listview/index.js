import React from 'react'
import { SafeAreaView, View, Text,TouchableOpcaity, Pressable } from 'react-native'
import { FlatList } from 'react-native'
import {styles}  from './style'

//TODO pressable opacity változtatási kattintás esetén WRAPPER component létrehozása szükséges a probléma megoldásához

const listTitle='Lista'

const DATA = [
    {
      id: '1',
      title: 'First Item',
      content: 'Content',
      link:'Click'
    },
    {
      id: '2',
      title: 'Second Item',
      content: 'Content',
      link:'Click'
    },
    {
      id: '3',
      title: 'Third Item',
      content: 'Content',
      link:'Click'
    },
    {
        id: '4',
        title: 'Fourth Item',
        content: 'Content',
        link:'Click'
      },
  ];

const Item = ({item}) => (
    <Pressable onPress={()=>console.log('helo')} android_ripple="true"> 
    <View style={styles.listitem}>
        <Text>{item.title}</Text> 
        <Text>{item.content}</Text>    
    </View>
    </Pressable>
)

export default function CustomListView(){
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
        data={DATA}
        renderItem={renderItem}
        keyExtractor = {item=>item.id}
        ></FlatList>
      </SafeAreaView>
    )
}