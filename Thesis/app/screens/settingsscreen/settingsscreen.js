import React, {useState} from 'react'
import { View ,SafeAreaView, Text} from 'react-native'
import LanguageSelector from './../../../components/languageSelector/index'
import { useTranslation } from 'react-i18next'
import { settingsscreenStyle } from './settingsscreenStyle'
import {SectionList,Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import CustomHeader from '../../../components/header/header'
import { ConfirmationModal } from '../../../components/modals/confirmation_modal'
import {CustomButton} from '../../../components/buttons/buttons'
import { CustomInput } from '../../../components/inputs/inputs'
import { AuthContext } from '../../../context/AuthContext'
import { useContext } from 'react'
import { changePassword } from '../../../slices/usersSlice'
import { useDispatch } from 'react-redux'




export default function ProfileScreen({route}){
    const {t} = useTranslation()
    const {logout,userInfo} = useContext(AuthContext)
    const [isModalVisible,setIsModalVisible] = useState(false)
    const [newPassword1, setNewPassword1] = useState('')
    const [newPassword2, setNewPassword2] = useState('')
    const [pswError,setPswError] = useState('')
    const dispatch = useDispatch()
    console.log(userInfo.access_token)

    const modalClose = () =>{
        setIsModalVisible(false)
    }

    const validatePasswords = async (password1,password2) =>{
        if(password1 !== password2)
        {
            return(
            setPswError('A jelszók nem egyeznek!')
            )
        }
        else{
            let values = {
                password:newPassword1,
                token:userInfo.access_token
            }
            return(
            setPswError(''),
            await Promise.all([dispatch(changePassword(values))]),
            logout()
            )
        }
    }

    const settingsOptions = [
        {
            id:'1',
            title:'Nyelv',
            icon: ( <Ionicons  name={'language-outline'} size={20} color={"#009AB9"}/> ),
            data:[
                <LanguageSelector/>
            ] 
        },
    ]


        const Item = ({item}) => (
        <Pressable android_ripple="true"> 
        <View style={settingsscreenStyle.settingsOptionContainer}>
            <Text style={settingsscreenStyle.settingsOptionText}>{item}</Text>
        </View>
        </Pressable>
        )
    
  
        const renderItem=({item}) =>{
                return(
                    <Item
                    item={item}
                    />
                )
            
        }


    return(
        <SafeAreaView style={settingsscreenStyle.container}>
            <CustomHeader title={route.params.HeaderText}></CustomHeader>
            <View style={settingsscreenStyle.settingListContainer}>
            <SectionList
            sections = {settingsOptions}
            keyExtractor={id=>id}
            renderItem={renderItem}
            renderSectionHeader={({section:{title,icon}}) =>(
                <View style={settingsscreenStyle.settingsOptionTitleContainer}>
                <Text style={settingsscreenStyle.settingsOptionTextTitle}>{title=='Megjelenítés' ? t('display') : t('language')}</Text>
                <View style={settingsscreenStyle.icon}>{icon}</View>
                </View>
            )}
            />
            <View style={settingsscreenStyle.buttonContainer}>
            <CustomButton buttonName={t('changePassword')} onPress={()=>setIsModalVisible(true)}></CustomButton>
            <CustomButton buttonName={t('logout')} onPress={()=>logout()}></CustomButton>
            </View>
            <ConfirmationModal visible={isModalVisible} onClose={modalClose}>
                <View style={settingsscreenStyle.modalContent}>
                <Text style={settingsscreenStyle.modalTitle}>{t('resetPassord')}</Text>
                <CustomInput secureTextEntry={true} label={t('password')} mode='outlined' theme={{roundness:40}} value={newPassword1} onChangeTextEvent={text => setNewPassword1(text)}></CustomInput>
                <CustomInput secureTextEntry={true} label={t('password')} mode='outlined' theme={{roundness:40}} value={newPassword2} onChangeTextEvent={text => setNewPassword2(text)}></CustomInput>
                {pswError &&
                <Text>{pswError}</Text>
                }
                <CustomButton buttonName={t('resetPassord')} onPress={()=>validatePasswords(newPassword1,newPassword2)}></CustomButton>
                </View>
            </ConfirmationModal>
            </View>
        </SafeAreaView>

    )
}