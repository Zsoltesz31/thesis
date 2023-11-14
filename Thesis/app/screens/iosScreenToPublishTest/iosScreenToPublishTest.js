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


export default function IosScreenToPublishTest({navigation,route}){
    const [date, setDate] = useState(new Date());
    const [courseId,setCourseId] = useState(null)
    const [startDate,setStartDate] = useState(new Date())
    const [lastStartDate,setLastStartDate] = useState(null)
    const dispatch = useDispatch()
    const {courses} = useSelector((state)=>state.course)
    const {t} = useTranslation()

    const onChange = async (event, selectedDate) => {
        const currentDate = selectedDate 
        let tempDate = new Date(currentDate)
        tempDate.setTime( tempDate.getTime() - tempDate.getTimezoneOffset()*60*1000 )
        let tempLastStartDate = new Date(tempDate.getTime() + 15*60000)
        await Promise.all([setStartDate(tempDate),setLastStartDate(tempLastStartDate)])
      };

    const handleAddTestToUpcommingTests = () =>{
        let values = {
            startDate:startDate,
            lastStartDate:lastStartDate,
            testId:route.params.testId,
            courseId:courseId
        }
        console.log('Ez megy fel:',values)
       dispatch(addTestToUpcomingTests(values)).then(navigation.goBack())
    }

  
   

    return(
        <SafeAreaView>
            <CustomHeader/>
            <View style={testSheetScreenStyle.titleContainer}>
                <Pressable style={testSheetScreenStyle.icon} onPress={()=>navigation.goBack()}><Ionicons name={'chevron-back-outline'} size={25} color={'white'}/></Pressable>
                <Text style={testSheetScreenStyle.title}>{route.params.testname}</Text>
            </View>
            <View style={testSheetScreenStyle.screenContent}>
            </View>
                <View style={testSheetScreenStyle.modalContent}>
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
                style={{width:'75%',backgroundColor:'#009AB9',height:50,padding:10,margin:5,color:'white'}}
                activeColor='#00B0D4'
                itemContainerStyle={{backgroundColor:'#009AB9',left:7,width:'100%'}}
                itemTextStyle={{color:'white',fontWeight:'bold'}}
                />
                <Text style={testSheetScreenStyle.modalTitle}>{t('date')}</Text>
                <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode='date'
                is24Hour={true}
                onChange={onChange}
                display='spinner'
                backgroundColor='#009AB9'
                timeZoneName={'Europe/Budapest'}
                timeZoneOffsetInMinutes={60}
                />
                <Text style={testSheetScreenStyle.modalTitle}>{t('exactTime')}</Text>
                <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode='time'
                is24Hour={true}
                onChange={onChange}
                display='spinner'
                backgroundColor='#009AB9'
                />
                <CustomButton buttonName={t('publish')} onPress={()=>handleAddTestToUpcommingTests()}></CustomButton>
                </View>
        </SafeAreaView>
    )
}