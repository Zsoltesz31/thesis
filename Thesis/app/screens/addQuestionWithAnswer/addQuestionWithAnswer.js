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
import { createQuestion,getQuestion } from '../../../slices/questionSlice'
import AnswerList from '../../../components/answerList/answerList'


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
    const [questionCreated,setQuestionCreated] = useState(false)
    const [questionEditMode,setQuestionEditMode] = useState(false)
    const [checked,setChecked] =useState(false)
    const [answer,setAnswer] = useState('')
    const [question,setQuestion] = useState('')
    const [questionType, setQuestionType] = useState('')
    const [addedQuestionId,setAddedQuestionId] = useState(null)

    const dispatch = useDispatch()



    const handleAddQuestion = ()=>{
        let values = {
            text:question,
            type:questionType,
            testId:route.params.testId
        }
         //dispatch(createQuestion(values))
         setQuestionCreated(true)
    }

    const handleEditQuestion = ()=>{
        let values = {
            text:question,
            type:questionType.type,
            testId:route.params.testId
        }
        console.log(values)
        console.log('MOST AZ EDITQUESTION FUT LE')
         //dispatch(createQuestion(values))
         setQuestionEditMode(false)
         setQuestionCreated(true)
    }

    const handleAddAnswer = ()=>{
        let values = {
            text:question,
            type:questionType.type,
            testId:route.params.testId
        }
        console.log(values)
         //dispatch(createQuestion(values))
         setQuestionCreated(true)
    }

    const handleModifyButtonPress = ()=>{
        setQuestionCreated(false)
        setQuestionEditMode(true)
    }

    const resetStatesToAddNewQuestion= () =>{
        setQuestionCreated(false)
        setQuestionEditMode(false)
    }

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
                value={QuestionTypes[3]}
                placeholder="Válassza ki a kérdés típusát"
                selectedTextStyle={{color:'white',fontWeight:'bold'}}
                onChange = {item=>{ setQuestionType(item.type)
                }}
                containerStyle={{width:330,borderRadius:25,left:5}}
                style={{width:'95%',left:7,backgroundColor:'#009AB9',height:40,padding:10,margin:5}}
                activeColor='#00B0D4'
                itemContainerStyle={{backgroundColor:'#009AB9',left:7}}
                itemTextStyle={{color:'white',fontWeight:'bold'}}
            />
                <Text style={AddQuestionWithAnswerStyle.formText}>Kérdés szövege:</Text>
            <CustomInput label={'Kérdés'} onChangeTextEvent={text => setQuestion(text)} outlineColor={'#009AB9'}></CustomInput>
           
            <CustomButton buttonName={questionEditMode ? 'Módosít' : 'Hozzáad'} onPress={questionEditMode ? ()=>{handleEditQuestion()} : ()=>{handleAddQuestion()}}></CustomButton>
        </View> }
        { questionCreated &&
            <View style={AddQuestionWithAnswerStyle.formContainer}>
            <Text style={AddQuestionWithAnswerStyle.formText}>Kérdés: </Text>
            <CustomButton buttonName={'Módosít'} onPress={()=>handleModifyButtonPress()}></CustomButton>
            <View>
            <CustomInput label={'Válaszlehetőség'} onChangeTextEvent={text => setAnswer(text)} outlineColor={'#009AB9'}></CustomInput>
                <View style={AddQuestionWithAnswerStyle.checkBoxContainer}>
                    <Text style={AddQuestionWithAnswerStyle.checkBoxText}>Helyes válasz:</Text>
                    <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={()=>{setChecked(!checked)}} color={'#009AB9'} uncheckedColor={'#009AB9'}></Checkbox>
                </View>
            <CustomButton buttonName={'Válasz hozzáadása'} onPress={()=>setQuestionCreated(false)}></CustomButton>
            </View>
                <AnswerList></AnswerList>
            <CustomButton buttonName={'Befejezés'}></CustomButton>
            </View>
        }

    </SafeAreaView>
)
}