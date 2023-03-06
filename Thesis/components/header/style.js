import { StyleSheet,Dimensions } from "react-native"

export const headerStyle = StyleSheet.create({
    svgCurve: {
        flex:1,
        alignSelf:'flex-start',
        position: 'absolute',
      },
    header: {
        backgroundColor:'#009AB9',
        height:90,
    },
    title:{
        color:'white',
        fontSize:25,
        fontWeight:'bold',
        alignSelf:'center',
        top:45

    }
})