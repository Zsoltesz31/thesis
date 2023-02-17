import React from 'react'
import {SafeAreaView, Text, Image, View } from 'react-native'
import {Card} from 'react-native-paper'
import Images from '../../../images/index'
import { profilescreenStyle } from './profilscreenStyle'
import { CustomButton } from '../../../components/buttons/buttons'

const MockProfileData = [
    {
      neptunCode:"Y8EP7V",
      fullName:"Teszt Elek",
      actualYear:6,
      coursesOn:4,
      completedTests:23,
      failedTests:4
    }
  ]

export default function ProfileScreen(){
    return(
        <SafeAreaView style={profilescreenStyle.content}>
            <View style={profilescreenStyle.container}>
             <Card theme={{roundness:20,borderStartColor:"black"}}>
                <Card.Title titleStyle={{ color:"rgba(0,153,218,200)", fontWeight:"bold", textAlign:"center"}} title="Saját adatok" ></Card.Title>
                <Card.Content>
                    <Image style={profilescreenStyle.image} source={ Images.loginimage }/>
                    <View style={profilescreenStyle.textContainer}>
                    <Text style={profilescreenStyle.Text}>Teljes név: {MockProfileData.fullName}</Text>
                    <Text style={profilescreenStyle.Text}>Neptun kód: {MockProfileData.neptunCode}</Text>
                    <Text style={profilescreenStyle.Text}>Kar és szak: IK</Text>
                    <Text style={profilescreenStyle.Text}>Jelenlegi félév: {MockProfileData.actualYear}</Text>
                    <Text style={profilescreenStyle.Text}>Felvett kurzusok: {MockProfileData.coursesOn}</Text>
                    <Text style={profilescreenStyle.Text}>Teljesített sikeres tesztek: {MockProfileData.completedTests}</Text>
                    <Text style={profilescreenStyle.Text}>Sikertelen tesztek: {MockProfileData.failedTests}</Text>
                    </View>
                </Card.Content>
            </Card>
            </View>
            <CustomButton style={profilescreenStyle.button} buttonName={"Frissít"}></CustomButton>
        </SafeAreaView>
    )
}