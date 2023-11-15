import React, {useState,useEffect}  from 'react'
import { View,SafeAreaView,Text,Pressable} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { CustomButton } from '../../../components/buttons/buttons'
import { CustomInput } from '../../../components/inputs/inputs'
import CustomHeader from '../../../components/header/header'
import { Ionicons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import { AddQuestionWithAnswerStyle } from './style'
import { useDispatch,useSelector } from 'react-redux'
import { createQuestion,getQuestion,updateQuestion} from '../../../slices/questionSlice'
import AnswerList from '../../../components/answerList/answerList'
import { getAnwser,createAnswer,reset } from '../../../slices/answerSlice'
import { useTranslation } from 'react-i18next'
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import * as FileSystem from 'expo-file-system';
import BASE_URL from '../../../config';




export default function AddQuestionWithAnswer({navigation,route}){
    const [changeHappened,setChangeHappened] = useState(false)
    const [answerCreated,setAnswerCreated] = useState(false)
    const [questionCreated,setQuestionCreated] = useState(false)
    const [questionEditMode,setQuestionEditMode] = useState(false)
    const [answer,setAnswer] = useState('')
    const [question,setQuestion] = useState('')
    const [points,setPoints] = useState('0')
    const [editQuestion,setEditQuestion] = useState(false)
    const [image,setImage] = useState(null)
    const {currentAddedQuestion} =useSelector((state)=>state.question)
    const {currentAddedTest} = useSelector((state)=>state.test)
    const {answers} =useSelector((state)=>state.answer)
    const {t} = useTranslation()
    const {userInfo} = useContext(AuthContext)
    let editDone = false


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
        dispatch(getAnwser(currentAddedQuestion.id)).then(setChangeHappened(false))
        }
    },[currentAddedQuestion,changeHappened])
    }
    else{
    useEffect(()=>{
        dispatch(getQuestion(route.params.questionId))
        getA()
        setChangeHappened(false)
    },[changeHappened])
    }

    const getA = async () =>{
        await Promise.all([dispatch(getAnwser(route.params.questionId))])
    }

    const handleAddQuestion = async ()=>{

            console.log('ezfutle')
            let values ={
                id:-1,
                text:question,
                type:questionType,
                testId:route.params.AddNewQuestion ? route.params.TestId : currentAddedTest.id
            }
            console.log(values)
            await Promise.all([dispatch(createQuestion(values))])
            setQuestionCreated(true)
            setChangeHappened(true)
    }

    

    const handleEditQuestion = async ()=>{ 
        let values = {
            text:question,
            type:questionType,
            id:currentAddedQuestion.id,
            testId:route.params.AddNewQuestion ? route.params.TestId : currentAddedQuestion.id
        }
         await Promise.all([dispatch(updateQuestion(values))])
         setQuestionEditMode(false)
         setQuestionCreated(true)
         setEditQuestion(false)
         setImage(null)
    }

    const handleEditQuestionFromQuestList = async ()=>{
        let values = {
            text:question,
            type:questionType,
            id:route.params.questionId,
            testId:route.params.testId
        }
         await Promise.all([dispatch(updateQuestion(values))])
         setQuestionEditMode(false)
         setQuestionCreated(true)
         setEditQuestion(false)
         setImage(null)
    }

    const handleAddAnswer = async ()=>{
        let values = {
            text:answer,
            questionId: route.params.FullEditMode ? route.params.questionId : currentAddedQuestion.id,
            point:parseInt(points)
        }
        await Promise.all([dispatch(createAnswer(values))])
         setQuestionCreated(true)
         setAnswerCreated(true)
         setChangeHappened(true)
    }

    const handleModifyButtonPress = ()=>{
        setEditQuestion(true)
        setQuestionCreated(false)
        setQuestionEditMode(true)
        setQuestion(currentAddedQuestion.text)
        setQuestionType(currentAddedQuestion.type)
    }

    const resetStatesToAddNewQuestion= () =>{
        setQuestionCreated(false)
        setQuestionEditMode(false)
        setQuestion('')
        setAnswer('')
        dispatch(reset())
        
    }

    function changeTracker(changed){
        setChangeHappened(changed)
    }

    const handleOpenImagePicker = async () =>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:false,
            aspect:[4,3],
            quality:1,
            base64: false
        })
        if(!result.canceled){
            setImage(result.assets[0])

        }
    }

    const handleAddImageToQuestion = async () => {
        if(image){
            const r = await FileSystem.uploadAsync(
                `${BASE_URL}question/image/${currentAddedQuestion.id}`,
                image.uri,
                {
                    headers: {
                        "authorization": `Bearer ${userInfo.access_token}`
                    },
                    httpMethod: 'POST',
                    uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                    fieldName: 'image',
                    mimeType: 'image/jpeg'
                }
            )
        }
        setImage(null)
    }

if(!route.params.FullEditMode)
{
return(
    <SafeAreaView>
        <CustomHeader/>
        <View style={AddQuestionWithAnswerStyle.titleContainer}>
            <Pressable style={AddQuestionWithAnswerStyle.icon} onPress={()=>{navigation.navigate('Tesztek',{testListMode:'Tests'}),dispatch(reset())}}><Ionicons name={'chevron-back-outline'} size={25} color={'white'}/></Pressable>
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
            <CustomButton buttonName={t('selectImage')} onPress={()=>handleOpenImagePicker()}></CustomButton>
            {
                image &&
                <View>
                <Text style={AddQuestionWithAnswerStyle.formText}>{t('imageSelected')}</Text>
                </View>
            }
            <CustomButton buttonName={t('end')} onPress={()=>(handleAddImageToQuestion(),navigation.replace('Tesztek',{testListMode:'Tests'}))}></CustomButton>
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
        <Text style={AddQuestionWithAnswerStyle.formText}>Kérdés: {currentAddedQuestion?.text}</Text>
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
            <CustomButton buttonName={t('selectImage')} onPress={()=>handleOpenImagePicker()}></CustomButton>
            {
                image &&
                <View>
                <Text style={AddQuestionWithAnswerStyle.formText}>{t('imageSelected')}</Text>
                </View>
            }
        <CustomButton buttonName={t('modifyEnd')} onPress={()=>{handleAddImageToQuestion(),navigation.replace('QuestionListScreen',{testname:route.params.testName,testId:route.params.testId}),dispatch(reset())}}></CustomButton>
        </View>
        </SafeAreaView>
    )
}
}
