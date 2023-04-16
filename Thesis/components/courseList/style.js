import { StyleSheet } from "react-native"

export const courseListStyle = StyleSheet.create({
    container:{
        alignItems: "center",
        width:'100%',
        display:'flex',
        height:400
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
        flexDirection:'row'
      },
      listItemHeader:{
        color:'white',
        fontWeight:'bold',
        marginRight:'auto',
        alignSelf:'center',
        fontSize:15
      },
      noCoursesText:{
        
        fontWeight:'bold',
        textAlign:'center',
        color:'#009AB9',
        fontSize:18
      }

   
})