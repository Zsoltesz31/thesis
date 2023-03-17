import { StyleSheet,Dimensions } from "react-native";

export const testListScreenStyle = StyleSheet.create({
    icon:{
        left:10,
        marginRight:'auto'
    },
    title:{
        color:'white',
        textAlign:'center',
        fontWeight:'bold',
        fontSize:25,
        right:Dimensions.get('window').width/2
    },
    titleContainer:{
        display:'flex',
        flexDirection:'row',
        top:45,
    },
    listContainer:{
        top:150
    },
   
})