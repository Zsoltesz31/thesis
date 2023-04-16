import React, {useState,useContext,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { SafeAreaView,View,Text,Pressable,FlatList} from 'react-native'
import CustomHeader from '../../../components/header/header'
import { CustomButton } from '../../../components/buttons/buttons'
import { UsersToCourseScreenStyle } from './style'
import { AuthContext } from '../../../context/AuthContext'
import { useTranslation } from 'react-i18next'
import { Ionicons } from '@expo/vector-icons';
import { addUserToCourse } from '../../../slices/courseSlice'




export default function UsersToCourse({route,navigation}){
    const {users} =useSelector((state)=>state.users)
    const {t} = useTranslation()
    const [clicked,setClicked] = useState(users.map(users=>false)) 
    const [usersToCourse,setUsersToCourse] = useState(null)
    const [usersToCourseName,setUsersToCourseName] = useState(null)
    const dispatch = useDispatch()

    const handleAddUser = (userId,index)=>{ 
        handleClicked(index) 
        let foundItem = users.find(element=>element.id==userId).id
        let foundItemName = users.find(element=>element.id==userId).firstName + ' ' + users.find(element=>element.id==userId).lastName
        setUsersToCourse(foundItem)
        setUsersToCourseName(foundItemName)
    } 
     
    const handleClicked = (index)=>{ 
        setClicked(prev=>prev.map((element,idx)=>{ 
            if(idx===index-1){ 
                return(  
                !element        
                ) 
            }else if(!idx===index-1){ 
                return element  
            } 
        })) 
    } 

    const handleAdd = () =>{
        let values ={
            courseId:route.params.courseId,
            userId:usersToCourse
        }
        dispatch(addUserToCourse(values))
    }

    const Item = ({item}) => (
        clicked[item.id-1] ? (
        <Pressable style={UsersToCourseScreenStyle.userSelectedContainer} onPress={()=>handleAddUser(item.id,item.id)} android_ripple="true"> 
        <View>
        <Text style={UsersToCourseScreenStyle.userSelectedTExt}>{item.firstName} {item.lastName}</Text> 
        </View>
        </Pressable>
        ) :
        (
        <Pressable style={UsersToCourseScreenStyle.userContainer} onPress={()=>handleAddUser(item.id,item.id)} android_ripple="true"> 
        <View>
        <Text style={UsersToCourseScreenStyle.userText}>{item.firstName} {item.lastName}</Text> 
        </View>
        </Pressable>
        )
    )
    
    const renderItem=({item}) =>{
        return(
            <Item
            item={item}
            />
        )
    }

    return(
        <SafeAreaView>
        <CustomHeader/>
        <View style={UsersToCourseScreenStyle.titleContainer}>
            <Pressable style={UsersToCourseScreenStyle.icon} onPress={()=>navigation.navigate('Kurzusaid')}><Ionicons name={'chevron-back-outline'} size={25} color={'white'}/></Pressable>
            <Text style={UsersToCourseScreenStyle.title1}>{t('members')}</Text>
        </View>
        <SafeAreaView style={UsersToCourseScreenStyle.listContainer}>
        <Text style={UsersToCourseScreenStyle.listTitle}>Felhasználók:</Text>
        <FlatList
            data={users}
            renderItem={renderItem}
            keyExtractor = {item=>item.id.toString()}
        ></FlatList>
        <Text style={UsersToCourseScreenStyle.listTitle}>Kiválasztott felhasználó: {usersToCourseName}</Text>
        <CustomButton buttonName={t('add')} onPress={()=>handleAdd()}></CustomButton>
        </SafeAreaView>  
        </SafeAreaView>
    )
}