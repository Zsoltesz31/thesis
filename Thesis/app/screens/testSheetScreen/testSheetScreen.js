import React,{useState} from 'react'
import { Pressable, SafeAreaView,Text,View } from 'react-native'
import CustomHeader from '../../../components/header/header'
import { testSheetScreenStyle } from './style'
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../../../components/buttons/buttons';
import { ConfirmationModal } from '../../../components/modals/confirmation_modal';


export default function TestSheetScreen({navigation,route}){
    const [isModalVisible,setIsModalVisible] = useState(false)

    const modalClose = () =>{
        setIsModalVisible(false)
    }
    const onStartTest = () =>{
        setIsModalVisible(true)
    }

    return(
        <SafeAreaView>
            <CustomHeader/>
            <View style={testSheetScreenStyle.titleContainer}>
                <Pressable style={testSheetScreenStyle.icon} onPress={()=>navigation.navigate('Tesztek',{courseId:route.params.courseId})}><Ionicons name={'chevron-back-outline'} size={25} color={'white'}/></Pressable>
                <Text style={testSheetScreenStyle.title}>{route.params.testName}</Text>
            </View>
            <View style={testSheetScreenStyle.screenContent}>
            <View style={testSheetScreenStyle.informationTitleContainer}>
                <Text style={testSheetScreenStyle.informationTitle}>Teszt információk</Text>
                </View>
            <View style={testSheetScreenStyle.testInformations}>
                <Text style={testSheetScreenStyle.informationText}>Teszt nyelve:</Text>
                <Text style={testSheetScreenStyle.informationText}>Rendelkezésre álló idő: </Text>
                <Text style={testSheetScreenStyle.informationText}>Kérdések száma: </Text>
                <Text style={testSheetScreenStyle.informationText}>Próbálkozások száma: 1</Text>
            </View>
            <View style={testSheetScreenStyle.testSheetButtons}>
                    <CustomButton buttonName={'Teszt indítása'} onPress={onStartTest}/>
            </View>
            </View>
            <ConfirmationModal visible={isModalVisible} onClose={modalClose}>
                <View style={testSheetScreenStyle.modalContent}>
                <Text style={testSheetScreenStyle.modalTitle}>Biztosan elkezdi a tesztet?</Text>
                <Text style={testSheetScreenStyle.modalDescription}>Az elkezdett tesztet megállítani nem lehet! Ha az alkalmazást bezárja a teszt automatikusan lezár és az addig leadott válaszokkal befejezi a tesztet!</Text>
                <CustomButton onPress={()=>navigation.navigate('TestEndScreen',{testId:route.params.testId,testName:route.params.testName,courseId:route.params.courseId})} buttonName={'Igen'}></CustomButton>
                <CustomButton buttonName={'Nem'}></CustomButton>
                </View>
            </ConfirmationModal>
        </SafeAreaView>
    )
}