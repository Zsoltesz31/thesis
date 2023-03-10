import { StyleSheet } from "react-native"


export const switchStyle =StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
    },
    switchTitle:{
        flex:1,
        color:'white',
        fontWeight:'bold',
        fontSize:16,
        justifyContent:'flex-start',
        alignSelf:'center',
        marginRight:220
    },
    switch:{
        flex:1,
        alignSelf:'center',
        justifyContent:'flex-end',
        marginLeft:'auto',
        
    }

})