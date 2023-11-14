import { StyleSheet,Dimensions } from "react-native";

export const testSheetScreenStyle = StyleSheet.create({
    icon:{
        left:10,
        marginRight:'auto',
        zIndex:225,
        top:30
    },
    title:{
        color:'white',
        textAlign:'center',
        fontWeight:'bold',
        fontSize:25,
    },
    screenContent:{
        display:'flex',
        alignItems:'center'
    },

        modalContent:{
            alignItems:'center',
            padding:50,

        },
        modalTitle:{
            fontWeight:'bold',
            fontSize:15,
            color:'#009AB9',
            textAlign:'center',
            margin:3
        }
})
