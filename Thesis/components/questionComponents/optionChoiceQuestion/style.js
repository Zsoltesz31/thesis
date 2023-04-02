import { StyleSheet } from "react-native";

export const OptionChoiceQuestionStyle = StyleSheet.create({
    questionTitle:{
        fontSize:18,
        fontWeight:'bold',
        textAlign:'center',
        color:'#009AB9',
        margin:10
    },
    questionContainer:{
        elevation:2,
        height:150,
        justifyContent:'center',
        borderRadius:5,
        width:'95%',
        alignSelf:'center',
        margin:10
    },
    answerContainer:{
        borderWidth:1,
        borderColor:'#009AB9',
        borderRadius:5,
        width:'80%',
        alignSelf:'center',
        margin:5,
        padding:2
    },
    answerText:{
        fontSize:15,
        fontWeight:'bold',
        textAlign:'center',
        color:'#009AB9',
        top:6
    },
    radioButtonContainer:{
        display:'flex',
        flexDirection:'row',
        alignSelf:'center'
    },

})