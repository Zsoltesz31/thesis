import {StyleSheet} from 'react-native'

export const settingsscreenStyle = StyleSheet.create({
    container: {
      display:'flex',
      flexDirection:'column',
      height:'100%'
    },
    settingListContainer: {
        top:170,
    },
    settingsOptionTextTitle: {
        color:"#009AB9",
        fontSize:20,
        marginRight:'auto',
        left:10,
        fontWeight:'bold',
        alignSelf:'center'
    },
    icon:{
        marginLeft:'auto',
        right:10,
        justifyContent:'center',
        height:35
    },
    settingsOptionTitleContainer:{
        display:'flex',
        flexDirection:'row',
        borderBottomWidth:3,
        borderColor:'#009AB9',
        borderRadius:15,
        left:2,
        width:'99%'
    },
    settingsOptionText: {
        fontSize:15,
        left:20,
        color:'white',
        fontWeight:'bold'
    },
    settingsOptionContainer:{
        width:'95%',
        height:50,
        backgroundColor:'#009AB9',
        borderRadius:15,
        left:9,
        justifyContent:'center',
        marginTop:5,
        marginBottom:5,
        elevation:2
    },
    buttonContainer:{
        top:200
    },
    modalContent:{
        alignItems:'center',
        width:'100%'
    },
    modalTitle:{
        fontWeight:'bold',
        fontSize:15
    },
    
})