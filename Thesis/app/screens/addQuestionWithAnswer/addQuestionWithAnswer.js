import React, {useState,useEffect}  from 'react'
import { View,SafeAreaView,Text,Pressable,ScrollView } from 'react-native'
import { Checkbox } from 'react-native-paper'
import { CustomButton } from '../../../components/buttons/buttons'
import { CustomInput } from '../../../components/inputs/inputs'
import CustomHeader from '../../../components/header/header'
import { Ionicons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import { AddQuestionWithAnswerStyle } from './style'
import { useDispatch,useSelector } from 'react-redux'
import { createQuestion,getQuestion,updateQuestion } from '../../../slices/questionSlice'
import AnswerList from '../../../components/answerList/answerList'
import { getAnwser,createAnswer } from '../../../slices/answerSlice'


const QuestionTypes = [
    {
     type:'CHECKBOX'
    },
    {
        type:'SIMPLE_ANSWER'
    },
    {
        type:'EXPLAIN_ANSWER'
    },
    {
        type:'SELECT_ONE'
    }
]


export default function AddQuestionWithAnswer({navigation,route}){
    const [changeHappened,setChangeHappened] = useState(false)
    const [answerCreated,setAnswerCreated] = useState(false)
    const [questionCreated,setQuestionCreated] = useState(false)
    const [questionEditMode,setQuestionEditMode] = useState(false)
    const [checked,setChecked] =useState(false)
    const [answer,setAnswer] = useState('')
    const [question,setQuestion] = useState('')
    const [questionType, setQuestionType] = useState(QuestionTypes[3])
    const [editQuestion,setEditQuestion] = useState(false)
    const {currentAddedQuestion} =useSelector((state)=>state.question)
    const {currentAddedTest} = useSelector((state)=>state.test)
    const {answers} =useSelector((state)=>state.answer)

    const dispatch = useDispatch()

    if(route.params.FullEditMode!=true)
    {
    useEffect(()=>{
        if(answerCreated){
        console.log('HOZZÁADOTT KÉRDÉS ADATOK:',currentAddedQuestion)
        dispatch(getAnwser(currentAddedQuestion.data.id))
        setChangeHappened(false)
        }
        setChangeHappened(false)
        console.log('CURRENT ADDED TEST:',currentAddedTest)
    },[currentAddedQuestion,changeHappened])
    }
    else{
    useEffect(()=>{
        dispatch(getQuestion(route.params.questionId))
        dispatch(getAnwser(route.params.questionId))
        setChangeHappened(false)
    },[changeHappened])
    }

    const handleAddQuestion = ()=>{
            let values = {
                text:question,
                type:questionType,
                testId:route.params.AddNewQuestion ? route.params.TestId : currentAddedQuestion.data.id
            }
        dispatch(createQuestion(values))
        setQuestionCreated(true)
        setChangeHappened(true)
    }
    

    const handleEditQuestion = ()=>{ 
        let values = {
            text:question,
            type:questionType,
            id:currentAddedQuestion.data.id,
            testId:route.params.AddNewQuestion ? route.params.TestId : currentAddedQuestion.data.id
        }
         dispatch(updateQuestion(values))
         setQuestionEditMode(false)
         setQuestionCreated(true)
         setEditQuestion(false)
    }

    const handleEditQuestionFromQuestList = ()=>{
        let values = {
            text:question,
            type:questionType,
            id:route.params.questionId,
            testId:route.params.testId
        }
         dispatch(updateQuestion(values))
         setQuestionEditMode(false)
         setQuestionCreated(true)
         setEditQuestion(false)
    }

    const handleAddAnswer = ()=>{
        let values = {
            text:answer,
            correct:checked,
            questionId:currentAddedQuestion.data.id,
            point:0
        }
        dispatch(createAnswer(values))
         setQuestionCreated(true)
         setAnswerCreated(true)
         setChangeHappened(true)
    }

    const handleModifyButtonPress = ()=>{
        setEditQuestion(true)
        setQuestionCreated(false)
        setQuestionEditMode(true)
        setQuestion(currentAddedQuestion.data.text)
        setQuestionType(currentAddedQuestion.data.type)
    }

    const resetStatesToAddNewQuestion= () =>{
        setQuestionCreated(false)
        setQuestionEditMode(false)
    }

    function changeTracker(changed){
        setChangeHappened(changed)
    }
if(!route.params.FullEditMode)
{
return(
    <SafeAreaView>
        <CustomHeader/>
        <View style={AddQuestionWithAnswerStyle.titleContainer}>
            <Pressable style={AddQuestionWithAnswerStyle.icon} onPress={()=>navigation.navigate('Tesztek')}><Ionicons name={'chevron-back-outline'} size={25} color={'white'}/></Pressable>
            <Text style={AddQuestionWithAnswerStyle.title1}>Kérdés hozzáadása</Text>
        </View>
        {!questionCreated &&
        <View style={AddQuestionWithAnswerStyle.formContainer}>
             <Text style={AddQuestionWithAnswerStyle.formText}>Kérdés típusa:</Text>
            <Dropdown
                data={QuestionTypes}
                labelField='type'
                valueField='type'
                value={questionType}
                placeholder="Válassza ki a kérdés típusát"
                selectedTextStyle={{color:'white',fontWeight:'bold'}}
                onChange = {item=>{ 
                    setQuestionType(item.type)
                    console.log(questionType)
                }}
                containerStyle={{width:330,borderRadius:25,left:5}}
                style={{width:'95%',left:7,backgroundColor:'#009AB9',height:40,padding:10,margin:5}}
                activeColor='#00B0D4'
                itemContainerStyle={{backgroundColor:'#009AB9',left:7}}
                itemTextStyle={{color:'white',fontWeight:'bold'}}
            />
                <Text style={AddQuestionWithAnswerStyle.formText}>Kérdés szövege:</Text>
            <CustomInput label={'Kérdés'} inputValue={question} onChangeTextEvent={text => setQuestion(text)} outlineColor={'#009AB9'}></CustomInput>
           
            <CustomButton buttonName={questionEditMode ? 'Módosít' : 'Hozzáad'} onPress={questionEditMode ? ()=>{handleEditQuestion()} : ()=>{handleAddQuestion()}}></CustomButton>
        </View> }
        { questionCreated &&
            <View style={AddQuestionWithAnswerStyle.formContainer}>
            <Text style={AddQuestionWithAnswerStyle.formText}>Kérdés: {question}</Text>
            <CustomButton buttonName={'Módosít'} onPress={()=>handleModifyButtonPress()}></CustomButton>
            <View>
            <CustomInput label={'Válaszlehetőség'} onChangeTextEvent={text => setAnswer(text)} outlineColor={'#009AB9'}></CustomInput>
                <View style={AddQuestionWithAnswerStyle.checkBoxContainer}>
                    <Text style={AddQuestionWithAnswerStyle.checkBoxText}>Helyes válasz:</Text>
                    <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={()=>{setChecked(!checked)}} color={'#009AB9'} uncheckedColor={'#009AB9'}></Checkbox>
                </View>
            <CustomButton buttonName={'Válasz hozzáadása'} onPress={()=>handleAddAnswer()}></CustomButton>
            </View>
                <AnswerList changeHappened={changeTracker} data={answers}></AnswerList>
            <CustomButton buttonName={'Következő kérdés'} onPress={()=>resetStatesToAddNewQuestion()}></CustomButton>
            <CustomButton buttonName={'Befejezés'} onPress={()=>navigation.replace('Tesztek')}></CustomButton>
            </View>
        }
          
    </SafeAreaView>
)
}
else{
    return(
        <SafeAreaView>
        <CustomHeader/>
        <View style={AddQuestionWithAnswerStyle.titleContainer}>
            <Pressable style={AddQuestionWithAnswerStyle.icon} onPress={()=>navigation.navigate('Tesztek')}><Ionicons name={'chevron-back-outline'} size={25} color={'white'}/></Pressable>
            <Text style={AddQuestionWithAnswerStyle.title1}>Kérdés módosítása</Text>
        </View>
        {editQuestion &&
        <View style={AddQuestionWithAnswerStyle.formContainer}>
             <Text style={AddQuestionWithAnswerStyle.formText}>Kérdés típusa:</Text>
            <Dropdown
                data={QuestionTypes}
                labelField='type'
                valueField='type'
                value={questionType}
                placeholder="Válassza ki a kérdés típusát"
                selectedTextStyle={{color:'white',fontWeight:'bold'}}
                onChange = {item=>{ 
                    setQuestionType(item.type)
                    console.log(questionType)
                }}
                containerStyle={{width:330,borderRadius:25,left:5}}
                style={{width:'95%',left:7,backgroundColor:'#009AB9',height:40,padding:10,margin:5}}
                activeColor='#00B0D4'
                itemContainerStyle={{backgroundColor:'#009AB9',left:7}}
                itemTextStyle={{color:'white',fontWeight:'bold'}}
            />
                <Text style={AddQuestionWithAnswerStyle.formText}>Kérdés szövege:</Text>
            <CustomInput label={'Kérdés'} inputValue={question} onChangeTextEvent={text => setQuestion(text)} outlineColor={'#009AB9'}></CustomInput>
           
            <CustomButton buttonName={'Módosít'} onPress={ ()=>{handleEditQuestionFromQuestList()} }></CustomButton>
        </View> }
        
        <View style={AddQuestionWithAnswerStyle.formContainer}>
        {!editQuestion &&
        <>
        <Text style={AddQuestionWithAnswerStyle.formText}>Kérdés: {route.params.qestionText}</Text>
        <CustomButton buttonName={'Kérdés módosítása'} onPress={()=>handleModifyButtonPress()}></CustomButton>
        </>
        }
        <View> 
        <CustomInput label={'Válaszlehetőség'} onChangeTextEvent={text => setAnswer(text)} outlineColor={'#009AB9'}></CustomInput>
            <View style={AddQuestionWithAnswerStyle.checkBoxContainer}>
                <Text style={AddQuestionWithAnswerStyle.checkBoxText}>Helyes válasz:</Text>
                <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={()=>{setChecked(!checked)}} color={'#009AB9'} uncheckedColor={'#009AB9'}></Checkbox>
            </View>
        <CustomButton buttonName={'Válasz hozzáadása'} onPress={()=>handleAddAnswer()}></CustomButton>
        </View>
            <AnswerList changeHappened={changeTracker} data={answers}></AnswerList>
        <CustomButton buttonName={'Módosítás befejezése'} onPress={()=>navigation.replace('QuestionListScreen',{testname:route.params.testName,testId:route.params.testId})}></CustomButton>
        </View>
        </SafeAreaView>
    )
}
}
