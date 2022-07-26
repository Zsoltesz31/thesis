import { StyleSheet } from "react-native"
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes"


export const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:40,
        paddingBottom:40,
        paddingHorizontal:20,
        alignItems:'center',
        justifyContent:'center'
        
    },
    listitem:{
        backgroundColor: '#fff',
        padding:10,
        marginTop:30,
        borderWidth: 2,
        borderTopLeftRadius: 5,
        borderTopRightRadius:5 ,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderColor:'#0099da',
    },
    toucheffect:{
        width:'100%'
    }
})