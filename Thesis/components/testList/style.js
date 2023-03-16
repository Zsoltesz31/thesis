import { StyleSheet } from "react-native";

export const testListStyle = StyleSheet.create({
    container:{
        alignItems: "center",
        width:'100%',
        display:'flex',
        marginBottom:50
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
    listitem:{
        color:'white',
        backgroundColor:'#009AB9',
        marginVertical:8,
        padding:20,
        width:350,
        borderRadius:5,
        elevation:5,
        flexDirection:'column'
      },
      listItemHeader:{
        color:'white',
        fontWeight:'bold',
        marginRight:'auto',
        alignSelf:'center',
        fontSize:15
      },
      deadline:{
        marginLeft:'auto',
        color:'white',
        fontWeight:'bold',
        marginTop:10,
        top:10
      }
})