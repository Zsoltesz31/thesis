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
        alignSelf:"center"
    },
    button:{
        marginTop:20,
        backgroundColor:"black"
    }
})