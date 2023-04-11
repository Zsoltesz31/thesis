import React,{useState,useEffect,useRef} from 'react'
import { Pressable, SafeAreaView,Text,View,FlatList } from 'react-native'
import CustomHeader from '../../../components/header/header'
import { Ionicons } from '@expo/vector-icons';
import { ConfirmationModal } from '../../../components/modals/confirmation_modal';
import { TestScreenStyle } from './style';
import { LongAnswerQuestion } from '../../../components/questionComponents/longAnswerQuestion/longAnswerQuestion';
import { OptionChoiceQuestion } from '../../../components/questionComponents/optionChoiceQuestion/optionChoiceQuestion';
import { MultipleOptionQuestion } from '../../../components/questionComponents/multipleOptionQuestion/multipleOptionQuestion';
import { ShortAnswerQuestion } from '../../../components/questionComponents/shortAnswerQuestion/shortAnswerQuestion'
import { useDispatch,useSelector } from 'react-redux';
import { getQuestionByTestId } from '../../../slices/questionSlice';
import { getTestById } from '../../../slices/testSlice';
import { validatePathConfig } from '@react-navigation/native';





export default function TestScreen({navigation,route}){
    const [collectedAnswers,setCollectedAnswers] = useState([])
    const [changeHappened,setChangeHappened] = useState(false)
    const {testById} = useSelector((state)=>state.test)
    const dispatch=useDispatch()
    const [timer,setTimer] = useState('00:00:00')
    const Ref = useRef(null)

    const getTimeRemaining = (time) =>{
        const d = Date.parse(time) - Date.parse(new Date())
        const seconds = Math.floor((d/1000)%60)
        const minutes = Math.floor((d/1000/60)%60)
        const hours = Math.floor((d/1000/60/60)%24)
        return{
            d,seconds,minutes,hours
        }
    } 

    const startTimer = (e) => {
        let {d,seconds,minutes,hours} = getTimeRemaining(e)
        if(d>=0){
            setTimer(
                (hours > 9 ? hours : '0' + hours) + ':' +
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }

    const clearTimer = (e) => {
        if(Ref.current)
            clearInterval(Ref.current)
        const id = setInterval(()=>{
            startTimer(e)
        },1000)
        Ref.current=id
    }


    const handleCollectAnswers = (answer) =>{
        setCollectedAnswers([
            ...collectedAnswers,
            {answer}
        ])
        if(answer!=[]){
        if(!answer.some((a)=>answer===a.answer)){
        setCollectedAnswers([
            ...collectedAnswers,
            {answer}
        ])
        }
    }
    }
    // ITT KELL ÁLLÍTANI A HATÁRIDŐT AMI MAJD EGY ÓRA LESZ
    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + 10);
        return deadline;
    }

    useEffect(()=>{
        clearTimer(getDeadTime())
    },[])


    const renderItem=({item}) =>{
        if(item.type=='SIMPLE_ANSWER')
        return(
            <ShortAnswerQuestion getAnwsers={getAnwsers} questionText={item.text}></ShortAnswerQuestion>
        )
        else if(item.type=='EXPLAIN_ANSWER'){
        return(
            <LongAnswerQuestion getAnwsers={getAnwsers} questionText={item.text}></LongAnswerQuestion>
        )
        }
        else if(item.type=='SELECT_ONE'){
        return(
            <OptionChoiceQuestion questionId={item.id} questionData={item} ></OptionChoiceQuestion>
        )
        }
        else if(item.type=='CHECKBOX'){
        return(
            <MultipleOptionQuestion questionId={item.id} getAnwsers={getAnwsers} questionText={item.text}></MultipleOptionQuestion>
        )
        }
    }

    return(
        <SafeAreaView style={TestScreenStyle.screenContainer}>
            <CustomHeader/>
            <View style={TestScreenStyle.titleContainer}>
                <Pressable style={TestScreenStyle.icon} onPress={()=>navigation.navigate('TestSheet',{testId:route.params.testId,testName:route.params.testName,courseId:route.params.courseId})}><Ionicons name={'chevron-back-outline'} size={25} color={'white'}/></Pressable>
                <Text style={TestScreenStyle.title}>{timer}</Text>
            </View>
            <View style={TestScreenStyle.questionContainer}>
                <FlatList
                data={testById.data.test.questions}
                renderItem={renderItem}
                keyExtractor={item=>item.id.toString()}
                />
            </View>
            <MultipleOptionQuestion></MultipleOptionQuestion>
        </SafeAreaView>
    )
}