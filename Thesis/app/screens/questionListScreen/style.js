import { StyleSheet,Dimensions } from "react-native";

export const questionListScreenStyle = StyleSheet.create({
    icon:{
        left:10,
        marginRight:'auto',
        zIndex:10,
        position:'absolute'
    },
    title:{
        color:'white',
        textAlign:'center',
        fontWeight:'bold',
        fontSize:25,
        flexGrow:1
    },
    titleContainer:{
        display:'flex',
        top:45,
    },
    listContainer:{
        top:150
    },
    createButton:{
        top:0
    }
})