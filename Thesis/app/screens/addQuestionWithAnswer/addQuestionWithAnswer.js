import React, {useState,useEffect}  from 'react'
import { View,SafeAreaView,Text,Pressable } from 'react-native'
import { Checkbox } from 'react-native-paper'
import { CustomButton } from '../../../components/buttons/buttons'
import { CustomInput } from '../../../components/inputs/inputs'
import CustomHeader from '../../../components/header/header'
import { Ionicons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import { AddQuestionWithAnswerStyle } from './style'
import { useDispatch } from 'react-redux'
import { createQuestion } from '../../../slices/questionSlice'

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
    const [checked,setChecked] =useState(false)
    const [answer,setAnswer] = useState('')
    const [question,setQuestion] = useState('')
    const [questionType, setQuestionType] = useState('')
    const dispatch = useDispatch()

    const handleAdd = ()=>{
        let values = {
            text:question,
            type:questionType.type,
            testId:route.params.testId
        }
        console.log(values)
         dispatch(createQuestion(values))
    }

return(
    <SafeAreaView>
        <CustomHeader/>
        <View style={AddQuestionWithAnswerStyle.titleContainer}>
            <Pressable style={AddQuestionWithAnswerStyle.icon} onPress={()=>navigation.navigate('Tesztek')}><Ionicons name={'chevron-back-outline'} size={25} color={'white'}/></Pressable>
            <Text style={AddQuestionWithAnswerStyle.title1}>Kérdés hozzáadása</Text>
        </View>
        <View style={AddQuestionWithAnswerStyle.formContainer}>
            <Dropdown
                data={QuestionTypes}
                labelField='type'
                valueField='type'
                value={QuestionTypes[3]}
                placeholder="Válassza ki a kérdés típusát"
                selectedTextStyle={{color:'white',fontWeight:'bold'}}
                onChange = {item=>{ setQuestionType(item)
                }}
                containerStyle={{width:330,borderRadius:25,left:5}}
                style={{width:'95%',left:7,backgroundColor:'#009AB9',height:40,padding:10,borderRadius:20}}
                activeColor='#00B0D4'
                itemContainerStyle={{backgroundColor:'#009AB9',left:7}}
                itemTextStyle={{color:'white',fontWeight:'bold'}}
            />
            <CustomInput label={'Kérdés'} onChangeTextEvent={text => setQuestion(text)} outlineColor={'#009AB9'}></CustomInput>
            {!questionCreated &&
            <CustomButton buttonName={'Hozzáad'} onPress={()=>handleAdd()}></CustomButton>
            }           
            { questionCreated &&
            <CustomButton buttonName={'Módosít'} onPress={()=>setQuestionCreated(false)}></CustomButton>
            }
        </View>
       
    </SafeAreaView>
)
}