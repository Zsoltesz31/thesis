import {StyleSheet} from 'react-native'
import { borderColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes'

export const profilescreenStyle = StyleSheet.create({
    content:{
        display:"flex",
        flex:1,
        alignItems:"center",
        flexDirection:"column",
    },
    container:{
        marginTop:160,
    },
    Text:{
        fontWeight:"bold",
        marginRight:0,
        color:"#009AB9",
        fontSize:20,
        padding:10,
        textAlign:'left'
    },
    image:{
        top:170,
        alignSelf:"center",
        marginBottom:50,
    },
})