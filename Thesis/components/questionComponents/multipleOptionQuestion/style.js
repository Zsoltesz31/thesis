import { StyleSheet } from "react-native";

export const MultipleOptionQuestionStyle = StyleSheet.create({
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
        borderWidth:2,
        justifyContent:'center',
        borderRadius:5,
        width:'95%',
        alignSelf:'center',
        margin:10,
        borderColor:'#009AB9',
    },
    answerContainer:{
        borderWidth:1,
        borderColor:'#009AB9',
        borderRadius:5,
        width:'80%',
        alignSelf:'center',
        margin:5,
        padding:2,
        height:50
    },
    checkBoxContainer:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'center',
        backgroundColor:'#009AB9',
        margin:3
    },
    checkBoxContainerNotIn:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'center',
        margin:3,
    },
    checkBoxText:{
        textAlign:'center',
        fontWeight:'bold',
        fontSize:18,
        color: '#009AB9',
        alignSelf:'center',
        bottom:2
    },
    checkBoxTextIn:{
        textAlign:'center',
        fontWeight:'bold',
        fontSize:18,
        color: 'white',
        alignSelf:'center',
        bottom:2
    },
    iamgecontainer:{
        flex:1,
        alignSelf:'center',

    },

})