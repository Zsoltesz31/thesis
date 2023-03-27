import { StyleSheet,Dimensions } from "react-native";

export const AddQuestionWithAnswerStyle = StyleSheet.create({
    titleContainer:{
        display:'flex',
        flexDirection:'row',
        top:45,
    },
    icon:{
        left:10,
        marginRight:'auto'
    },
    title1:{
        color:'white',
        textAlign:'center',
        fontWeight:'bold',
        fontSize:25,
        right:Dimensions.get('window').width/2/2
    },
    formContainer:{
        top:Dimensions.get('window').height/2/2-70,
        width:'90%',
        display:'flex',
        justifyContent:'center',
        left:'5%',
        elevation:15
    },
    formTitle:{
        textAlign:'center',
        fontWeight:'bold',
        fontSize:20,
        color: '#009AB9'
    },
    formText:{
        textAlign:'center',
        fontWeight:'bold',
        fontSize:15,
        color: '#009AB9'
    },
    checkBoxContainer:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'center'
    },
    checkBoxText:{
        textAlign:'center',
        fontWeight:'bold',
        fontSize:18,
        color: '#009AB9',
        alignSelf:'center',
        bottom:2
    }
})