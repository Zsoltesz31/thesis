import { StyleSheet,Dimensions } from "react-native"

export const DarkModeSwitchStyle = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        width:350,

    },
    text:{
        flex:1,
        color:'white',
        fontWeight:'bold',
        fontSize:15,
        justifyContent:'flex-start',
        alignSelf:'center',
    },
    switch:{
        flex:1,
        alignSelf:'flex-end',
        justifyContent:'flex-end'
    }
    
   
})