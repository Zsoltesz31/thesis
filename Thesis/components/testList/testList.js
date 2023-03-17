import React from 'react'
import {View,Text,SafeAreaView,FlatList,Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import {testListStyle} from'./style'


const data = [
    {
        id:1,
        courseId:1,
        deadline:'10.16 00:00',
        title:'Programmozás módszertan',
        succes:null
    },
    {
        id:2,
        courseId:1,
        deadline:'10.16 00:00',
        title:'Magasszintű programmozási nyelvek',
        succes:false
    },
    {
        id:3,
        courseId:2,
        deadline:'10.16 00:00',
        title:'Webprogrammozás 1',
        succes:true
    },
    {
        id:4,
        courseId:2,
        deadline:'10.16 00:00',
        title:'Webprogrammozás 1',
        succes:true
    },
    {
        id:5,
        courseId:3,
        deadline:'10.16 00:00',
        title:'Webprogrammozás 1',
        succes:true
    }
]




export default function TestList({navigation,courseId}){
    

    const Item = ({item}) => (
        <Pressable onPress={()=>navigation.navigate('TestSheet',{testId:item.id,testName:item.title,courseId:courseId})} android_ripple="true"> 
        <View style={[testListStyle.listitem, item.succes == null ? testListStyle.defaultBorder : (item.succes && true ? testListStyle.succesBorder : testListStyle.failBorder)]}>
        <Text style={testListStyle.listItemHeader}>{item.title}</Text>
        <View style={testListStyle.listCrudButtons}>
        <Pressable><Ionicons name={'create-outline'} size={20} color={"white"}/></Pressable>
        <Pressable><Ionicons name={'trash-outline'} size={20} color={"white"}/></Pressable>
        </View>
        <View style={testListStyle.testFooterContainer}>
        {item.succes == true &&
              <Ionicons style={testListStyle.icon} name={'checkmark-outline'} size={20} color={"white"}/>
        }
         {item.succes == false &&
              <Ionicons style={testListStyle.icon} name={'close-outline'} size={20} color={"white"}/>
        }
        <Text style={testListStyle.deadline}>Határidő: {item.deadline}</Text>
        </View>
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
            showsHorizontalScrollIndicator={false}
            data={data.filter(item=> item.courseId==courseId)}
            renderItem={renderItem}
            keyExtractor = {item=>item.id.toString()}
            ></FlatList>
          </SafeAreaView>  
        
    )
    
}