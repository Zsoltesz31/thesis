import React,{useState,useEffect,useContext} from 'react'
import { Pressable, SafeAreaView,Text,View } from 'react-native'
import CustomHeader from '../../../components/header/header'
import { CustomButton } from '../../../components/buttons/buttons'
import { testListScreenStyle } from './style'
import { Ionicons } from '@expo/vector-icons';
import {useSelector,useDispatch} from 'react-redux'
import { getAllTests,getTestsByOwner } from '../../../slices/testSlice'
import { getUpcomingTestByCourseId } from '../../../slices/upcommingTestSlice'
import TestList from '../../../components/testList/testList'
import { useTranslation } from 'react-i18next'
import { AuthContext } from '../../../context/AuthContext'
import { getAllUsers } from '../../../slices/usersSlice'


export default function TestListScreen({navigation,route}){
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const {tests} =useSelector((state)=>state.test)
    const {upComingTests} =useSelector((state)=>state.upComingTest)
    const [changeHappened,setChangeHappened] = useState(false)
    const {userData} = useContext(AuthContext)

    useEffect(()=>{
        dispatch(getAllUsers())
        if(route.params.testListMode=='Tests'){
        dispatch(getTestsByOwner(userData.id))
        console.log(tests)
        }
        else if(route.params.testListMode=='upComingTests')
        {
            dispatch(getUpcomingTestByCourseId(route.params.courseId))
        }
        setChangeHappened(false)
    },[changeHappened])

    function changeTracker(changed){
        setChangeHappened(changed)
    }
 

    return(
        <SafeAreaView>
            <CustomHeader/>
            <View style={testListScreenStyle.titleContainer}>
                <Pressable style={testListScreenStyle.icon} onPress={()=>navigation.navigate('Kurzusaid')}><Ionicons name={'chevron-back-outline'} size={25} color={'white'}/></Pressable>
                <Text style={testListScreenStyle.title}>{route.params.testListMode=='upComingTests' ? route.params.courseName : t('tests')}</Text>
            </View>
            <View style={testListScreenStyle.listContainer}>
            <TestList changeListener={changeTracker} data={route.params.testListMode=='Tests'? tests : upComingTests} navigation={navigation} listType={route.params.testListMode}></TestList>
            {route.params.testListMode=='upComingTests' &&
            <CustomButton buttonName={'Kitöltött tesztek'} onPress={()=>navigation.navigate('CheckedTestsScreen')}></CustomButton>
            }
            { userData.role=='TEACHER' && route.params.testListMode=='Tests' &&
            <CustomButton buttonName={t('createTest')} onPress={()=>navigation.navigate('CreateTest',{edit:false,testData:{title:'',description:''}})}></CustomButton>
            }
             { userData.role=='TEACHER' && route.params.testListMode=='upComingTests' &&
            <CustomButton buttonName={t('addUsersToCourse')} onPress={()=>navigation.navigate('UsersToCourse',{courseId:route.params.courseId})}></CustomButton>
            }
            </View>
        </SafeAreaView>
    )
}