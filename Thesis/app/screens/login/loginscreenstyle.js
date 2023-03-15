import { StyleSheet } from "react-native"
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes"

export const loginScreenStyle = StyleSheet.create({
    content:{
        display:"flex",
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
        backgroundColor:"white",
    },
    view: {
        width:"90%",
      
    },
    card:{
        backgroundColor:"#fff"
        
    },

    cardimage:{
        alignSelf:"center",
        width:150,
        height:150
    },
    button:{
        marginTop:20,
        backgroundColor:"black"
    },
    title:{
        textAlign:'center',
        fontWeight:'bold',
        fontSize:25,
        color:'#009AB9'

    }
    
})