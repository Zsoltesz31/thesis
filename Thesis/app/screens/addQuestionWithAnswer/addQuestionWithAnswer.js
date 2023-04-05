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
import { useTranslation } from 'react-i18next'


export default function AddQuestionWithAnswer({navigation,route}){
    const [changeHappened,setChangeHappened] = useState(false)
    const [answerCreated,setAnswerCreated] = useState(false)
    const [questionCreated,setQuestionCreated] = useState(false)
    const [questionEditMode,setQuestionEditMode] = useState(false)
    const [checked,setChecked] =useState(false)
    const [answer,setAnswer] = useState('')
    const [question,setQuestion] = useState('')
    const [editQuestion,setEditQuestion] = useState(false)
    const {currentAddedQuestion} =useSelector((state)=>state.question)
    const {currentAddedTest} = useSelector((state)=>state.test)
    const {answers} =useSelector((state)=>state.answer)
    const {t} = useTranslation()

    const QuestionTypes = [
        {
         type:'CHECKBOX',
         label:t('checkbox')
        },
        {
            type:'SIMPLE_ANSWER',
            label:t('simpleAnswer')
        },
        {
            type:'EXPLAIN_ANSWER',
            label:t('explainAnswer')
        },
        {
            type:'SELECT_ONE',
            label:t('selectOne')
        }
    ]
    const [questionType, setQuestionType] = useState(QuestionTypes[3].type)

    const dispatch = useDispatch()
    console.log(questionType)
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
            <Text style={AddQuestionWithAnswerStyle.title1}>{t('addQuestion')}</Text>
        </View>
        {!questionCreated &&
        <View style={AddQuestionWithAnswerStyle.formContainer}>
             <Text style={AddQuestionWithAnswerStyle.formText}>{t('questionType')}:</Text>
            <Dropdown
                data={QuestionTypes}
                labelField='label'
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
                <Text style={AddQuestionWithAnswerStyle.formText}>{t('questionText')}:</Text>
            <CustomInput label={t('question')} inputValue={question} onChangeTextEvent={text => setQuestion(text)} outlineColor={'#009AB9'}></CustomInput>
           
            <CustomButton buttonName={questionEditMode ? t('modify') : t('add')} onPress={questionEditMode ? ()=>{handleEditQuestion()} : ()=>{handleAddQuestion()}}></CustomButton>
        </View> }
        { questionCreated &&
            <View style={AddQuestionWithAnswerStyle.formContainer}>
            <Text style={AddQuestionWithAnswerStyle.formText}>{t('question')}: {question}</Text>
            <CustomButton buttonName={t('modify')} onPress={()=>handleModifyButtonPress()}></CustomButton>
            { questionType=='CHECKBOX' || questionType=='SELECT_ONE' &&
            <View>
            <CustomInput label={t('answer')} onChangeTextEvent={text => setAnswer(text)} outlineColor={'#009AB9'}></CustomInput>
                <View style={AddQuestionWithAnswerStyle.checkBoxContainer}>
                    <Text style={AddQuestionWithAnswerStyle.checkBoxText}>{t('correctAnswer')}:</Text>
                    <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={()=>{setChecked(!checked)}} color={'#009AB9'} uncheckedColor={'#009AB9'}></Checkbox>
                </View>
            <CustomButton buttonName={t('addAnswer')} onPress={()=>handleAddAnswer()}></CustomButton>
            </View>
            }
                <AnswerList changeHappened={changeTracker} data={answers}></AnswerList>
            <CustomButton buttonName={t('nextQuestion')} onPress={()=>resetStatesToAddNewQuestion()}></CustomButton>
            <CustomButton buttonName={t('end')} onPress={()=>navigation.replace('Tesztek',{testListMode:'Tests'})}></CustomButton>
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
            <Text style={AddQuestionWithAnswerStyle.title1}>{t('modifyQuestion')}</Text>
        </View>
        {editQuestion &&
        <View style={AddQuestionWithAnswerStyle.formContainer}>
             <Text style={AddQuestionWithAnswerStyle.formText}>{t('questionType')}:</Text>
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
            <CustomInput label={t('question')} inputValue={question} onChangeTextEvent={text => setQuestion(text)} outlineColor={'#009AB9'}></CustomInput>
           
            <CustomButton buttonName={t('modify')} onPress={ ()=>{handleEditQuestionFromQuestList()} }></CustomButton>
        </View> }
        
        <View style={AddQuestionWithAnswerStyle.formContainer}>
        {!editQuestion &&
        <>
        <Text style={AddQuestionWithAnswerStyle.formText}>Kérdés: {route.params.qestionText}</Text>
        <CustomButton buttonName={t('modifyQuestion')} onPress={()=>handleModifyButtonPress()}></CustomButton>
        </>
        }
        { questionType=='CHECKBOX' || questionType=='SELECT_ONE' &&
        <View> 
        <CustomInput label={t('answer')} onChangeTextEvent={text => setAnswer(text)} outlineColor={'#009AB9'}></CustomInput>
            <View style={AddQuestionWithAnswerStyle.checkBoxContainer}>
                <Text style={AddQuestionWithAnswerStyle.checkBoxText}>Helyes válasz:</Text>
                <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={()=>{setChecked(!checked)}} color={'#009AB9'} uncheckedColor={'#009AB9'}></Checkbox>
            </View>
        <CustomButton buttonName={t('addAnswer')} onPress={()=>handleAddAnswer()}></CustomButton>
        </View>
        }
            <AnswerList changeHappened={changeTracker} data={answers}></AnswerList>
        <CustomButton buttonName={t('modifyEnd')} onPress={()=>navigation.replace('QuestionListScreen',{testname:route.params.testName,testId:route.params.testId})}></CustomButton>
        </View>
        </SafeAreaView>
    )
}
}
