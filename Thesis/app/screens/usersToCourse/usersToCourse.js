import React, {useState,useCallback,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { SafeAreaView,View,Text,Pressable,FlatList, useFocusEffect} from 'react-native'
import CustomHeader from '../../../components/header/header'
import { CustomButton } from '../../../components/buttons/buttons'
import { UsersToCourseScreenStyle } from './style'
import { useTranslation } from 'react-i18next'
import { Ionicons } from '@expo/vector-icons';
import { addUserToCourse,getUsersInCourse, deleteUserFromCourse} from '../../../slices/courseSlice'

export default function UsersToCourse({route,navigation}){
    const {users} =useSelector((state)=>state.users)
    const {usersInCourse, loading} = useSelector((state)=>state.course)
    const {t} = useTranslation()
    const [clicked,setClicked] = useState(null) 
    const [clickedOnDelete,setClickedOnDelete] = useState(null) 
    const [usersToCourse,setUsersToCourse] = useState(null)
    const [usersRemoveFromCourse,setUsersRemoveFromCourse] = useState(null)
    const [usersToCourseName,setUsersToCourseName] = useState(null)
    const dispatch = useDispatch()
    const [differedArray,setDifferedArray] = useState([])

    useEffect(()=>{
        setDifferedArray([])
        setDifferedArray(users.filter(x=> usersInCourse.findIndex(u=> u.id === x.id)==-1))
    },[usersInCourse])
      

    const handleAddUser = (userId)=>{ 
        let foundItem = users.find(element=>element.id==userId).id
        let foundItemName = users.find(element=>element.id==userId).firstName + ' ' + users.find(element=>element.id==userId).lastName
        setUsersToCourse(foundItem)
        setUsersToCourseName(foundItemName)
    } 

    const handleDeleteUser = (userId)=>{
        let foundItem = users.find(element=>element.id==userId)?.id
        setUsersRemoveFromCourse(foundItem)
    } 
     

    const handleAdd = async () =>{
        let values ={
            courseId:route.params.courseId,
            userId:usersToCourse
        }
        await Promise.all([dispatch(addUserToCourse(values))])
        dispatch(getUsersInCourse(route.params.courseId))
    }

    const handleDelete = async () =>{
        let values ={
            courseId:route.params.courseId,
            userId:usersRemoveFromCourse
        }
        await Promise.all([dispatch(deleteUserFromCourse(values))])
        dispatch(getUsersInCourse(route.params.courseId))
    }
    

    const Item = ({item,index}) => (
        index===clicked?(
        <Pressable style={UsersToCourseScreenStyle.userSelectedContainer} onPress={()=>{handleAddUser(item.id); setClicked(index)}} android_ripple="true"> 
        <View>
        <Text style={UsersToCourseScreenStyle.userSelectedTExt}>{item.firstName} {item.lastName}</Text> 
        </View>
        </Pressable>
        ):
        (
        <Pressable style={UsersToCourseScreenStyle.userContainer} onPress={()=>{handleAddUser(item.id);setClicked(index)}} android_ripple="true"> 
        <View>
        <Text style={UsersToCourseScreenStyle.userText}>{item.firstName} {item.lastName}</Text> 
        </View>
        </Pressable>
        )
    )
    
    const renderItem=({item,index}) =>{
        return(
            <Item
            item={item}
            index={index}
            />
        )
    }

    const Item2 = ({item,index}) => (
        index===clickedOnDelete?(
            <Pressable style={UsersToCourseScreenStyle.userSelectedContainer} onPress={()=>{handleDeleteUser(item.id); setClickedOnDelete(index)}} android_ripple="true"> 
            <View>
            <Text style={UsersToCourseScreenStyle.userSelectedTExt}>{item.firstName} {item.lastName}</Text> 
            </View>
            </Pressable>
            ):
            (
            <Pressable style={UsersToCourseScreenStyle.userContainer} onPress={()=>{handleDeleteUser(item.id);setClickedOnDelete(index)}} android_ripple="true"> 
            <View>
            <Text style={UsersToCourseScreenStyle.userText}>{item.firstName} {item.lastName}</Text> 
            </View>
            </Pressable>
            )
    )
    
    const renderItemUsersInCourse=({item,index}) =>{
        return(
            <Item2
            item={item}
            index={index}
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
        <Text style={UsersToCourseScreenStyle.listTitle}>{t('users')}</Text>
        <FlatList
            data={differedArray}
            renderItem={renderItem}
            keyExtractor = {item=>item.id.toString()}
            extraData={clicked}
        ></FlatList>
        <Text style={UsersToCourseScreenStyle.listTitle}>{t('selectedUser')} {usersToCourseName}</Text>
        <CustomButton buttonName={t('add')} onPress={()=>handleAdd()}></CustomButton>
        <View style={UsersToCourseScreenStyle.titleContainer2}>
        <Text style={UsersToCourseScreenStyle.title2}>{t('addedUsers')}</Text>
        </View>
        <SafeAreaView style={UsersToCourseScreenStyle.listContainer2}>
        <FlatList
            data={usersInCourse}
            renderItem={renderItemUsersInCourse}
            keyExtractor = {item2=>`userInCourse${item2.id.toString()}`}
            extraData={clickedOnDelete}
        ></FlatList>
        <CustomButton buttonName={t('delete')} onPress={()=>handleDelete()}></CustomButton>
        </SafeAreaView>
        </SafeAreaView>  
        </SafeAreaView>
    )
}