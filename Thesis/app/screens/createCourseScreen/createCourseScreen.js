import React, {useState,useContext,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { SafeAreaView,View,Text,Pressable,FlatList} from 'react-native'
import CustomHeader from '../../../components/header/header'
import { CustomButton } from '../../../components/buttons/buttons'
import { CustomInput } from '../../../components/inputs/inputs'
import { CreateCourseScreenStyle } from './style'
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../../context/AuthContext'
import { useTranslation } from 'react-i18next'


export default function CreateCourseScreen({route,navigation}){
    const users = [
        {
            id:1,
            name:'ASD1'
        },
        {
            id:2,
            name:'ASD2'
        },
        {
            id:3,
            name:'ASD1'
        },
        {
            id:4,
            name:'ASD2'
        },
        {
            id:5,
            name:'ASD1'
        },
        {
            id:6,
            name:'ASD2'
        }
    ]
    const dispatch = useDispatch()
    const {userData} = useContext(AuthContext)
    const editMode = route.params.editMode
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [clicked,setClicked] = useState(users.map(users=>false)) 
    const [usersToCourse,setUsersToCourse] = useState([])
    const {t} = useTranslation()

    useEffect(()=>{
        //if(editMode){
            //setTitle(route.params.testData.title)
            //setDescription(route.params.testData.description)
        //}
    },[])

    const handleAddUser = (userId,index)=>{ 
        handleClicked(index) 
        let foundItem = users.find(element=>element.id==userId).name 
        console.log('FOUNDITEM:',foundItem) 
        if(!usersToCourse.includes(foundItem)) 
        { 
            setUsersToCourse(current => [...current,foundItem]) 
        } 
        else if(usersToCourse.includes(foundItem)){ 
            console.log(usersToCourse.includes(foundItem)) 
            let array = [...usersToCourse] 
            let index = array.indexOf(foundItem) 
            if(index!==-1){ 
                array.splice(index,1) 
                setUsersToCourse(array) 
            } 
        } 
        console.log(usersToCourse) 
    } 
     
    const handleClicked = (index)=>{ 
        setClicked(prev=>prev.map((element,idx)=>{ 
            if(idx===index-1){ 
                return !element 
            } 
            return element 
        })) 
    } 

    const handleAdd = ()=>{
        let values = {
            title:title,
            description:description,
            ownerId:userData.id
        }

    }

    const handleEdit = () =>{
        let values = {
            title:title,
            description:description,
            ownerId:userData.id,
            courseId: route.params.courseData.id
        }


    }

        const Item = ({item}) => (
        clicked[item.id-1] ? (
        <Pressable style={CreateCourseScreenStyle.userSelectedContainer} onPress={()=>handleAddUser(item.id,item.id)} android_ripple="true"> 
        <View>
        <Text style={CreateCourseScreenStyle.userSelectedTExt}>{item.name}</Text> 
        </View>
        </Pressable>
        ) :
        (
        <Pressable style={CreateCourseScreenStyle.userContainer} onPress={()=>handleAddUser(item.id,item.id)} android_ripple="true"> 
        <View>
        <Text style={CreateCourseScreenStyle.userText}>{item.name}</Text> 
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


    if(editMode==false)
    {
    return(
        <SafeAreaView>
            <CustomHeader/>
            <View style={CreateCourseScreenStyle.titleContainer}>
                <Pressable style={CreateCourseScreenStyle.icon} onPress={()=>navigation.navigate('Kurzusaid')}><Ionicons name={'chevron-back-outline'} size={25} color={'white'}/></Pressable>
                <Text style={CreateCourseScreenStyle.title1}>{t('createCourse')}</Text>
            </View>
            <View style={CreateCourseScreenStyle.formContainer}>
                <Text style={CreateCourseScreenStyle.formTitle}>{t('courseData')}</Text>
                <CustomInput label={t('courseName')} onChangeTextEvent={text => setTitle(text)} outlineColor={'#009AB9'}></CustomInput>
                <CustomInput label={t('courseDesc')} onChangeTextEvent={text => setDescription(text)} outlineColor={'#009AB9'}></CustomInput>
                <CustomButton buttonName={t('create')} onPress={()=>handleAdd()}></CustomButton>
            </View>
            <SafeAreaView style={CreateCourseScreenStyle.listContainer}>
                <Text style={CreateCourseScreenStyle.listTitle}>Felhasználók:</Text>
            <FlatList
            data={users}
            renderItem={renderItem}
            keyExtractor = {item=>item.id.toString()}
            ></FlatList>
            <CustomButton buttonName={t('add')} onPress={()=>handleAdd()}></CustomButton>
          </SafeAreaView>  
        </SafeAreaView>
    )
    }else if(editMode==true){
        return(
        <SafeAreaView>
            <CustomHeader/>
            <View style={CreateCourseScreenStyle.titleContainer}>
                <Pressable style={CreateCourseScreenStyle.icon} onPress={()=>navigation.navigate('Kurzusaid')}><Ionicons name={'chevron-back-outline'} size={25} color={'white'}/></Pressable>
                <Text style={CreateCourseScreenStyle.title1}>{t('modifyTest')}</Text>
            </View>
            <View style={CreateCourseScreenStyle.formContainer}>
                <Text style={CreateCourseScreenStyle.formTitle}>{t('testData')}</Text>
                <CustomInput inputValue={title} label={t('testName')} onChangeTextEvent={text => setTitle(text)} outlineColor={'#009AB9'}></CustomInput>
                <CustomInput inputValue={description} label={t('testDesc')} onChangeTextEvent={text => setDescription(text)} outlineColor={'#009AB9'}></CustomInput>
                <CustomButton buttonName={t('modify')} onPress={()=>handleEdit()}></CustomButton>
            </View>
        </SafeAreaView>
        )
    }
}