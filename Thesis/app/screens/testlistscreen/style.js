import { StyleSheet,Dimensions } from "react-native";

export const testListScreenStyle = StyleSheet.create({
    icon:{
        left:10,
        marginRight:'auto',
        position:'absolute',
        zIndex:10
    },
    title:{
        color:'white',
        textAlign:'center',
        fontWeight:'bold',
        fontSize:25,
        width:'100%'
    },
    titleContainer:{
        display:'flex',
        flexDirection:'row',
        top:45,
    },
    listContainer:{
        top:150
    },
    createButton:{
        top:0
    },
    Homeicon:{
        right:10,

    }
})