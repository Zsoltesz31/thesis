import React from 'react'
import {SafeAreaView, Text, Image } from 'react-native'
import {Card} from 'react-native-paper'
import Images from '../../../images/index'

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
        <SafeAreaView>
             <Card theme={{roundness:20,}}>
                <Card.Title titleStyle={{ color:"rgba(0,153,218,200)", fontWeight:"bold", textAlign:"center"}} title="Saját adatok" ></Card.Title>
                <Card.Content>
                    <Image source={ Images.loginimage }/>
                    <Text>Teljes név: {MockProfileData.fullName}</Text>
                    <Text>Neptun kód: {MockProfileData.neptunCode}</Text>
                    <Text>Kar és szak: IK</Text>
                    <Text>Jelenlegi félév: {MockProfileData.actualYear}</Text>
                    <Text>Felvett kurzusok: {MockProfileData.coursesOn}</Text>
                    <Text>Teljesített sikeres tesztek: {MockProfileData.completedTests}</Text>
                    <Text>Sikertelen tesztek: {MockProfileData.failedTests}</Text>
                </Card.Content>
            </Card>
        </SafeAreaView>
    )
}