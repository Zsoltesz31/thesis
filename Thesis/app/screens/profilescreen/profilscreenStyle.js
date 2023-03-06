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
        width:"70%",
        marginBottom:50,
        borderColor:"#009AB9",
        borderWidth:4,
        borderRadius:25,
        elevation:20
    },
    Text:{
        fontWeight:"bold"
    },
    image:{
        alignSelf:"center",
        marginBottom:50,

    },
    button:{

    }
})