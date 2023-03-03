import {StyleSheet} from 'react-native'

export const chooseUserScreenStyle = StyleSheet.create({
    content:{
        flex:1,
        alignItems:'center',
        flexDirection:'column'
    },
    button:{
        backgroundColor:'#009AB9',
        width:'70%',
        alignItems:'center',
        margin:40,
        height:'8%',
        borderRadius:5,
        justifyContent:'center',
        elevation:4
        
    },
    title:{
        fontSize:32,
        color:'#009AB9',
        fontWeight:'bold',
        marginBottom:20,
       marginTop:200

    },
    subTitle:{
        fontSize:15,
        color:'#009AB9',
        fontWeight:'bold'
    },
    buttonText:{
        color:'white',
        fontSize:17,
        fontWeight:'bold'   
    }

})