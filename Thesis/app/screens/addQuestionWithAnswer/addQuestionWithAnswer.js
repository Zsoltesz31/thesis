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
    const [points,setPoints] = useState('0')
    const [editQuestion,setEditQuestion] = useState(false)
    const {currentAddedQuestion} =useSelector((state)=>state.question)
    const {currentAddedTest} = useSelector((state)=>state.test)
    const {answers} =useSelector((state)=>state.answer)
    const {t} = useTranslation()
    const QuestionTypes = [
        {
         type:'SELECT_ONE',
         value:0,
         label:t('selectOne')
        },
        {
        type:'SELECT_MORE',
        value:1,
        label:t('checkbox')
        }
    ]
    const [questionType, setQuestionType] = useState(QuestionTypes[1].value)
    const dispatch = useDispatch()
    if(route.params.FullEditMode!=true)
    {
    useEffect(()=>{
        if(questionCreated){
        dispatch(getAnwser(currentAddedQuestion.data.id))
        setChangeHappened(false)
        }
        setChangeHappened(false)
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
                id:-1,
                text:question,
                type:questionType,
                testId:route.params.AddNewQuestion ? route.params.TestId : currentAddedTest.data.id
            }
        dispatch(createQuestion(values))
        setQuestionCreated(true)
        //setChangeHappened(true)
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
        console.log(questionType)
         dispatch(updateQuestion(values))
         setQuestionEditMode(false)
         setQuestionCreated(true)
         setEditQuestion(false)
    }

    const handleAddAnswer = ()=>{
        let values = {
            text:answer,
            questionId: route.params.FullEditMode ? route.params.questionId : currentAddedQuestion.data.id,
            point:parseInt(points)
        }
        console.log(values)
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
        setQuestion('')
        setAnswer('')
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
            <Pressable style={AddQuestionWithAnswerStyle.icon} onPress={()=>navigation.navigate('Tesztek',{testListMode:'Tests'})}><Ionicons name={'chevron-back-outline'} size={25} color={'white'}/></Pressable>
            <Text style={AddQuestionWithAnswerStyle.title1}>{t('addQuestion')}</Text>
        </View>
        {!questionCreated &&
        <View style={AddQuestionWithAnswerStyle.formContainer}>
             <Text style={AddQuestionWithAnswerStyle.formText}>{t('questionType')}:</Text>
            <Dropdown
                data={QuestionTypes}
                labelField='label'
                valueField='value'
                value={questionType}
                placeholder="Válassza ki a kérdés típusát"
                selectedTextStyle={{color:'white',fontWeight:'bold'}}
                onChange = {item=>{ 
                    setQuestionType(item.value)
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
       
            <View>
            <CustomInput label={t('answer')} onChangeTextEvent={text => setAnswer(text)} outlineColor={'#009AB9'}></CustomInput>
                <View style={AddQuestionWithAnswerStyle.checkBoxContainer}>
                    <Text style={AddQuestionWithAnswerStyle.checkBoxText}>Pontok:</Text>
                    <CustomInput label={'Pontok'} inputValue={points} onChangeTextEvent={text => setPoints(text)} outlineColor={'#009AB9'}/>
                </View>
            <CustomButton buttonName={t('addAnswer')} onPress={()=>handleAddAnswer()}></CustomButton>
            </View>
            
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
            <Pressable style={AddQuestionWithAnswerStyle.icon} onPress={()=>navigation.navigate('Tesztek',{testListMode:'Tests'})}><Ionicons name={'chevron-back-outline'} size={25} color={'white'}/></Pressable>
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
        <View> 
        <CustomInput label={t('answer')} onChangeTextEvent={text => setAnswer(text)} outlineColor={'#009AB9'}></CustomInput>
            <View style={AddQuestionWithAnswerStyle.checkBoxContainer}>
                <Text style={AddQuestionWithAnswerStyle.checkBoxText}>Pontok:</Text>
                <CustomInput label={'Pontok'} inputValue={points} onChangeTextEvent={text => setPoints(text)} outlineColor={'#009AB9'}/>
            </View>
        <CustomButton buttonName={t('addAnswer')} onPress={()=>handleAddAnswer()}></CustomButton>
        </View>
        </>
        }
            <AnswerList changeHappened={changeTracker} data={answers} questionId={route.params.questionId} fullEditMode={route.params.FullEditMode}></AnswerList>
        <CustomButton buttonName={t('modifyEnd')} onPress={()=>navigation.replace('QuestionListScreen',{testname:route.params.testName,testId:route.params.testId})}></CustomButton>
        </View>
        </SafeAreaView>
    )
}
}
