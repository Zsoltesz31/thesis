import { StyleSheet,Dimensions } from "react-native"

export const registerScreenStyle = StyleSheet.create({
    registerFormContainer:{
        display:'flex',
        flexDirection:'column',
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        justifyContent:'center',
    },
    inputs:{
        right:0,
        alignSelf:'center',
        width:'90%',
        marginLeft:0,
        marginRight:0,
        top:0
    },
    buttons:{
        alignSelf:'center',
        width:'80%',
        marginTop:30
    },
    formTitle:{
        color:'#009AB9',
        fontWeight:'bold',
        fontSize:20,
        textAlign:'center'
    },
    screenTitle:{
        color:'white',
        fontSize:30,
        fontWeight:'bold',
        textAlign:'center',
        top:40,
        marginBottom:-50
    }
})