import React,{useEffect, useState,useContext} from 'react'
import { Pressable, SafeAreaView,Text,View } from 'react-native'
import CustomHeader from '../../../components/header/header'
import { testSheetScreenStyle } from './style'
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../../../components/buttons/buttons';
import { ConfirmationModal } from '../../../components/modals/confirmation_modal';
import { useDispatch,useSelector } from 'react-redux';
import { getTestById } from '../../../slices/testSlice';
import { addTestToUpcomingTests } from '../../../slices/upcommingTestSlice';
import { getCoursesByOwnerId } from '../../../slices/courseSlice';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTranslation } from 'react-i18next'
import { AuthContext } from '../../../context/AuthContext';
import { Dropdown } from 'react-native-element-dropdown';
import { setFillStartTest } from '../../../slices/fillTestSlice';


export default function TestSheetScreen({navigation,route}){
    const [isModalVisible,setIsModalVisible] = useState(false)
    const [isDateModalVisible,setIsDateModalVisible] = useState(false)
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [courseId,setCourseId] = useState(null)
    const [startDate,setStartDate] = useState(new Date())
    const [lastStartDate,setLastStartDate] = useState(null)
    const dispatch = useDispatch()
    const {userData} = useContext(AuthContext)
    const {testById} = useSelector((state)=>state.test)
    const {courses} = useSelector((state)=>state.course)
    const {t} = useTranslation()

    useEffect(()=>{
        dispatch(getTestById(route.params.testId))
        dispatch(getCoursesByOwnerId(userData.id))
    },[])

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date
        setShow(false); //Platform.OS === 'ios'
        setDate(currentDate);
        let tempDate = new Date(currentDate)
        let tempLastStartDate = new Date(tempDate.getTime() + 15*60000)
        setStartDate(tempDate)
        setLastStartDate(tempLastStartDate)
      };

      const showMode = (currentMode) => {
        setShow(true)
        setMode(currentMode)
  };

    const handleAddTestToUpcommingTests = () =>{
        let values = {
            startDate:startDate,
            lastStartDate:lastStartDate,
            testId:route.params.testId,
            courseId:courseId
        }
        console.log(values)
        dispatch(addTestToUpcomingTests(values))
        DatemodalClose()
    }

    const modalClose = () =>{
        setIsModalVisible(false)
    }
    const onStartTest = () =>{
        setIsModalVisible(true)
    }
    const DatemodalClose = () =>{
        setIsDateModalVisible(false)
    }
    const startTestFunction = () =>{
        modalClose()
        let values = {
            userId:userData.id,
            upComingTestId:route.params.testId
        }
        dispatch(setFillStartTest(values))
        navigation.navigate('TestScreen',{testId:route.params.testId,testName:route.params.testName,courseId:route.params.courseId})
    }

    return(
        <SafeAreaView>
            <CustomHeader/>
            <View style={testSheetScreenStyle.titleContainer}>
                <Pressable style={testSheetScreenStyle.icon} onPress={()=>navigation.navigate('Tesztek',{courseId:route.params.courseId,testListMode:route.params.listType})}><Ionicons name={'chevron-back-outline'} size={25} color={'white'}/></Pressable>
                <Text style={testSheetScreenStyle.title}>{route.params.testname}</Text>
            </View>
            {show && (
            <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
            display='default'
            />
            )}
            <View style={testSheetScreenStyle.screenContent}>
            <View style={testSheetScreenStyle.informationTitleContainer}>
                <Text style={testSheetScreenStyle.informationTitle}>{t('testInformation')}</Text>
            </View>
            <View style={testSheetScreenStyle.testInformations}>
                <Text style={testSheetScreenStyle.informationText}>{t('timeAvailable')}: 60 {t('min')}</Text>
                <Text style={testSheetScreenStyle.informationText}>{t('numberOfAttempts')}: 1</Text>
            </View>
            <View style={testSheetScreenStyle.testSheetButtons}>
                    {route.params.listType == 'upComingTests' &&
                    <CustomButton buttonName={t('startTest')} onPress={onStartTest}/>
                    }
                    {userData.role=='TEACHER' && route.params.listType != 'upComingTests' &&
                    <CustomButton buttonName={t('modifyQuestions')} onPress={()=>(navigation.navigate('QuestionListScreen',{testname:route.params.testname,testId:route.params.testId}))}></CustomButton>
                    }
                    {userData.role=='TEACHER' && route.params.listType != 'upComingTests' &&
                    <CustomButton buttonName={t('addQuestion')} onPress={()=>(navigation.navigate('AddQuestionWithAnswer',{FullEditMode:false,AddNewQuestion:true,TestId:route.params.testId}))}></CustomButton>
                    }
                    {userData.role=='TEACHER' && route.params.listType != 'upComingTests' &&
                    <CustomButton buttonName={t('publishTest')} onPress={()=>setIsDateModalVisible(true)}></CustomButton>
                    }
            </View>
            </View>
            <ConfirmationModal visible={isModalVisible} onClose={modalClose}>
                <View style={testSheetScreenStyle.modalContent}>
                <Text style={testSheetScreenStyle.modalTitle}>Biztosan elkezdi a tesztet?</Text>
                <Text style={testSheetScreenStyle.modalDescription}>Az elkezdett tesztet megállítani nem lehet! Ha az alkalmazást bezárja a teszt automatikusan lezár és az addig leadott válaszokkal befejezi a tesztet!</Text>
                <CustomButton onPress={()=>startTestFunction()} buttonName={'Igen'}></CustomButton>
                <CustomButton buttonName={'Nem'}></CustomButton>
                </View>
            </ConfirmationModal>
            <ConfirmationModal visible={isDateModalVisible} onClose={DatemodalClose}>
                <View style={testSheetScreenStyle.modalContent}>
                <Text style={testSheetScreenStyle.modalTitle}>{t('dateModalText')}</Text>
                <CustomButton buttonName={t('setDate')} onPress={()=>showMode('date')}></CustomButton>
                <CustomButton buttonName={t('setTime')} onPress={()=>showMode('time')}></CustomButton>
                <Dropdown
                data={courses.data}
                labelField='name'
                valueField='id'
                value={courseId}
                placeholder="Válassza ki a kurzust"
                selectedTextStyle={{color:'white',fontWeight:'bold'}}
                onChange = {item=>{ 
                    setCourseId(item.id)
                    console.log(courseId)
                }}
                containerStyle={{width:280,borderRadius:25,left:5}}
                style={{width:'75%',left:7,backgroundColor:'#009AB9',height:40,padding:10,margin:5}}
                activeColor='#00B0D4'
                itemContainerStyle={{backgroundColor:'#009AB9',left:7}}
                itemTextStyle={{color:'white',fontWeight:'bold'}}
                />
                <CustomButton buttonName={t('publish')} onPress={()=>handleAddTestToUpcommingTests()}></CustomButton>
                </View>
            </ConfirmationModal>
        </SafeAreaView>
    )
}