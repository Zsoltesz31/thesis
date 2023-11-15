import { StyleSheet } from "react-native";

export const OptionChoiceQuestionStyle = StyleSheet.create({
    questionTitle:{
        fontSize:18,
        fontWeight:'bold',
        textAlign:'center',
        color:'#009AB9',
        margin:10,
        borderWidth:1,
        borderColor:'#009AB9',
        borderRadius:5
    },
    questionContainer:{
        justifyContent:'center',
        borderRadius:5,
        borderWidth:2,
        width:'95%',
        alignSelf:'center',
        margin:10,
        borderColor:'#009AB9'
    },
    answerContainer:{
        borderWidth:1,
        borderColor:'#009AB9',
        borderRadius:5,
        width:'80%',
        alignSelf:'center',
        margin:5,
        padding:2,
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
    iamgecontainer:{
        flex:1,
        alignSelf:'center',

    },


})