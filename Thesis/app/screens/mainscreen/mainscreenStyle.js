import {StyleSheet} from 'react-native'

export const mainScreenStyle = StyleSheet.create({
    container: {
        display:'flex',
        flex:1,
        width:'100%',
        backgroundColor:'white',
        alignItems:'center',
    },
    titleContainerOnIos: {
        disply:'flex',
        height:90,
        justifyContent:'center',
        
    },
    titleContainerOnAndroid: {
        disply:'flex',
        height:150,
        justifyContent:'center',

    },
    welcomeTitle:{
        color:'white',
        fontSize:35,
        fontWeight:'bold',
        alignSelf:'center',
    },
    title:{
        color:'white',
        fontSize:25,
        alignSelf:'center',
    },
    desc:{
        textAlign:'justify',
        color:'#009AB9',
        fontWeight:'bold',
        fontSize:18,
        padding:15,

    }
    
})