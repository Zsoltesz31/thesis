import React,{useEffect, useState} from 'react'
import { Pressable, SafeAreaView,Text,View } from 'react-native'
import CustomHeader from '../../../components/header/header'
import { testSheetScreenStyle } from './style'
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../../../components/buttons/buttons';
import { ConfirmationModal } from '../../../components/modals/confirmation_modal';
import { useDispatch,useSelector } from 'react-redux';
import { getTestById } from '../../../slices/testSlice';
import { addTestToUpcomingTests } from '../../../slices/upcommingTestSlice';
import DateTimePicker from '@react-native-community/datetimepicker';



export default function TestSheetScreen({navigation,route}){
    const [isModalVisible,setIsModalVisible] = useState(false)
    const [isDateModalVisible,setIsDateModalVisible] = useState(false)
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [startDate,setStartDate] = useState(new Date())
    const [lastStartDate,setLastStartDate] = useState(null)
    const dispatch = useDispatch()
    const {testById} = useSelector((state)=>state.test)
    
    useEffect(()=>{
        //dispatch(getTestById(route.params.testId))
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
        }
        console.log(values)
        dispatch(addTestToUpcomingTests(values))
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

    return(
        <SafeAreaView>
            <CustomHeader/>
            <View style={testSheetScreenStyle.titleContainer}>
                <Pressable style={testSheetScreenStyle.icon} onPress={()=>navigation.navigate('Tesztek',{courseId:route.params.courseId})}><Ionicons name={'chevron-back-outline'} size={25} color={'white'}/></Pressable>
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
                <Text style={testSheetScreenStyle.informationTitle}>Teszt információk</Text>
            </View>
            <View style={testSheetScreenStyle.testInformations}>
                <Text style={testSheetScreenStyle.informationText}>Rendelkezésre álló idő: </Text>
                <Text style={testSheetScreenStyle.informationText}>Kérdések száma: </Text>
                <Text style={testSheetScreenStyle.informationText}>Próbálkozások száma: 1</Text>
            </View>
            <View style={testSheetScreenStyle.testSheetButtons}>
                    <CustomButton buttonName={'Teszt indítása'} onPress={onStartTest}/>
                    <CustomButton buttonName={'Kérdések módosítása'} onPress={()=>(navigation.navigate('QuestionListScreen',{testname:route.params.testname,testId:route.params.testId}))}></CustomButton>
                    <CustomButton buttonName={'Kérdés hozzáadása'} onPress={()=>(navigation.navigate('AddQuestionWithAnswer',{FullEditMode:false,AddNewQuestion:true,TestId:route.params.testId}))}></CustomButton>
                    <CustomButton buttonName={'Teszt kiadása'} onPress={()=>setIsDateModalVisible(true)}></CustomButton>
            </View>
            </View>
            <ConfirmationModal visible={isModalVisible} onClose={modalClose}>
                <View style={testSheetScreenStyle.modalContent}>
                <Text style={testSheetScreenStyle.modalTitle}>Biztosan elkezdi a tesztet?</Text>
                <Text style={testSheetScreenStyle.modalDescription}>Az elkezdett tesztet megállítani nem lehet! Ha az alkalmazást bezárja a teszt automatikusan lezár és az addig leadott válaszokkal befejezi a tesztet!</Text>
                <CustomButton onPress={()=>(navigation.navigate('TestScreen',{testId:route.params.testId,testName:route.params.testName,courseId:route.params.courseId}),modalClose())} buttonName={'Igen'}></CustomButton>
                <CustomButton buttonName={'Nem'}></CustomButton>
                </View>
            </ConfirmationModal>
            <ConfirmationModal visible={isDateModalVisible} onClose={DatemodalClose}>
                <View style={testSheetScreenStyle.modalContent}>
                <Text style={testSheetScreenStyle.modalTitle}>Állítsa be a teszt kezdésének időpontját!</Text>
                <CustomButton buttonName={'Dátum beállítása'} onPress={()=>showMode('date')}></CustomButton>
                <CustomButton buttonName={'Pontos idő beállítása'} onPress={()=>showMode('time')}></CustomButton>
                <CustomButton buttonName={'Kiadás'} onPress={()=>handleAddTestToUpcommingTests()}></CustomButton>
                </View>
            </ConfirmationModal>
        </SafeAreaView>
    )
}