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
      borderRadius:5,
      elevation:5
    },
    listTitle:{
      color:'#009AB9',
      fontSize:25,
      fontWeight:'bold',
      borderBottomWidth:5,
      borderRadius:15,
      borderColor:'#009AB9',
      alignSelf:'flex-start',
      width:'100%'
    },
    listItemHeader:{
      color:'white',
      fontWeight:'bold',
      alignSelf:'center',
      bottom:10

    },
    listItemContent:{
      color:'white'

    },
    listItemSender:{
      color:'white',
      alignSelf:'flex-end',
      top:10
    }
})