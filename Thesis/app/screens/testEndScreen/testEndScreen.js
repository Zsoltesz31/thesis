import React,{useState} from 'react'
import { Pressable, SafeAreaView,Text,View } from 'react-native'
import CustomHeader from '../../../components/header/header'
import { testEndScreenStyle } from './style'
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../../../components/buttons/buttons';
import { ConfirmationModal } from '../../../components/modals/confirmation_modal';


export default function TestEndScreen({navigation,route}){
    const [isModalVisible,setIsModalVisible] = useState(false)

    const modalClose = () =>{
        setIsModalVisible(false)
    }
    const onEndTest = () =>{
        setIsModalVisible(true)
    }

    return(
        <SafeAreaView>
            <CustomHeader/>
            <View style={testEndScreenStyle.titleContainer}>
                <Pressable style={testEndScreenStyle.icon} onPress={()=>navigation.navigate('TestSheet',{testId:route.params.testId,testName:route.params.testName,courseId:route.params.courseId})}><Ionicons name={'chevron-back-outline'} size={25} color={'white'}/></Pressable>
                <Text style={testEndScreenStyle.title}>Teszt befejezése</Text>
            </View>
            <View style={testEndScreenStyle.screenContent}>
            <View style={testEndScreenStyle.informationTitleContainer}>
                <Text style={testEndScreenStyle.informationTitle}>Teszt információk</Text>
                </View>
            <View style={testEndScreenStyle.testInformations}>
                <Text style={testEndScreenStyle.informationText}>Teszt kitöltöttsége</Text>
                <Text style={testEndScreenStyle.informationText}>Megválaszolt kérdések: </Text>
                <Text style={testEndScreenStyle.informationText}>Hátralévő idő: </Text>
            </View>
            <View style={testEndScreenStyle.testSheetButtons}>
                    <CustomButton buttonName={'Befejezés'} onPress={onEndTest}/>
            </View>
            </View>
            <ConfirmationModal visible={isModalVisible} onClose={modalClose}>
                <View style={testEndScreenStyle.modalContent}>
                <Text style={testEndScreenStyle.modalTitle}>Biztosan befejezi a tesztet?</Text>
                <Text style={testEndScreenStyle.modalDescription}>Befejezés után a válaszok nem módosíthatóak, az eddig leadott válaszok véglegessé válnak!</Text>
                <CustomButton buttonName={'Igen'}></CustomButton>
                <CustomButton buttonName={'Nem'}></CustomButton>
                </View>
            </ConfirmationModal>
        </SafeAreaView>
    )
}