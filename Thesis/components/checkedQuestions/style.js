import { StyleSheet } from "react-native";

export const CheckedQuestionsListStyle = StyleSheet.create({
    container:{
        alignItems: "center",
        width:'100%',
        display:'flex',
        marginTop:100,
        height:500
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
    listitemCorrect:{
        color:'white',
        backgroundColor:'#009AB9',
        marginVertical:8,
        padding:20,
        width:350,
        borderRadius:5,
        elevation:5,
        flexDirection:'column',
        borderWidth:1,
        borderColor:'green'
      },listitemUnCorrect:{
        color:'white',
        backgroundColor:'#009AB9',
        marginVertical:8,
        padding:20,
        width:350,
        borderRadius:5,
        elevation:5,
        flexDirection:'column',
        borderWidth:1,
        borderColor:'red'
      },
      listItemHeader:{
        color:'white',
        fontWeight:'bold',
        marginRight:'auto',
        alignSelf:'center',
        fontSize:15
      },
  
})