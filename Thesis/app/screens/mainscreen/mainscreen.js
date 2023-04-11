import React, { useEffect, useState, useRef,useContext } from 'react'
import { SafeAreaView, Text,Pressable,View,ScrollView } from 'react-native'
import {CustomInput} from '../../../components/inputs/inputs'
import {CustomButton} from '../../../components/buttons/buttons'
import {ConfirmationModal} from "../../../components/modals/confirmation_modal"
import { mainScreenStyle } from './mainscreenStyle'
import CustomListView from '../../../components/listview/index'
import CustomHeader from '../../../components/header/header'
import { AuthContext } from '../../../context/AuthContext'
import { useTranslation } from 'react-i18next'



export default function MainScreen({route}){
    const {userData} = useContext(AuthContext)
    const {t} = useTranslation()

    return(
        <SafeAreaView style={mainScreenStyle.container}>
            <CustomHeader></CustomHeader>
            <Text style={mainScreenStyle.title}>{userData.firstName} {userData.lastName}</Text>
            <Text style={mainScreenStyle.welcomeTitle}>{t('welcome')}</Text>
            <View style={mainScreenStyle.container}>
                {userData.role=='STUDENT' &&
                <View>
                <Text style={mainScreenStyle.desc}>Az alkalmazás az online oktatás során felmerülő számonkérések, szintfelmérések megvalósítását próbálja megkönnyebbíteni, vagy éppen ezen problémákra ad egy megoldást.
                </Text>
                <Text style={mainScreenStyle.desc}>Jelenlegi fiókja egy hallgatói fiók amelyben lehetősége van az önhöz rendelt kurzusokban megjelenő tesztek kitöltésére. Ezen tesztek zöme akár zárthelyi dolgozatoknak is megfelelhetnek vagy éppen vizsgaidőszakok során előforduló vizsgákat is.</Text>
                <Text style={mainScreenStyle.desc}>A navigálást az alsó menü sáv segíti a különböző menüpontok eléréséért!</Text>
                </View>
                }
                 {userData.role=='TEACHER' &&
                <View>
                <Text style={mainScreenStyle.desc}>Az alkalmazás az online oktatás során felmerülő számonkérések, szintfelmérések megvalósítását próbálja megkönnyebbíteni, vagy éppen ezen problémákra ad egy megoldást.
                </Text>
                <Text style={mainScreenStyle.desc}>Jelenlegi fiókja egy oktatói fiók, amelyben lehetősége van kurzusok valamint tesztek létrehozására egyaránt. A kurzusokhoz tetszőleges hallgatókat rendelhet hozzá a meglévő felhasználó listából (eddig regisztrált felhasználók) így reprezentálhatja egy neptunban meglévő kurzusát. Később a kurzusokat tetszés szerint módosítja.
                 Továbbá teszteket hozhat létre amelyeket adott kurzusok számára publikálhat. Természetesen szintúgy tetszőlegesen módosítathja a teszteket is kérdéseikkel, válaszaikkal együtt!
                </Text>
                <Text style={mainScreenStyle.desc}>A navigálást az alsó menü sáv segíti a különböző menüpontok eléréséért!</Text>
                </View>
                }
            </View>
        </SafeAreaView>
    )
}