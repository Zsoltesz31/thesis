import { StyleSheet,Dimensions } from "react-native";

export const CheckedTestsScreenStyle = StyleSheet.create({
    icon:{
        left:10,
        marginRight:'auto'
    },
    title:{
        color:'white',
        textAlign:'center',
        fontWeight:'bold',
        fontSize:25,
        width:Dimensions.get('window').width/2,
        justifyContent:'center',
        right:Dimensions.get('window').width/2/2,

    },
    titleContainer:{
        display:'flex',
        flexDirection:'row',
        top:45,
    },
   
})