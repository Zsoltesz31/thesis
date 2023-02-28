import { StyleSheet } from "react-native"
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes"

export const ForgotPasswordscreenStyle = StyleSheet.create({
    content:{
        display:"flex",
        flex:1,
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'center',
        

    },
    title:{
        fontSize:32,
        color:'#009AB9',
        fontWeight:'bold',
        marginBottom:20,
        bottom:'10%'
    },
    backButton:{
        marginTop:300
    }
   
})