import { StyleSheet } from "react-native"
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes"


export const styles = StyleSheet.create({
    container:{
      alignItems: "center",
      width:'100%',
      display:'flex'
    },
    listitem:{
      color:'white',
      backgroundColor:'#009AB9',
      marginVertical:8,
      padding:20,
      width:350,
      borderRadius:5
    }
})