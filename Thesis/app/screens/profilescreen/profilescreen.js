import React from 'react'
import { View ,SafeAreaView, Text } from 'react-native'

export default function ProfileScreen(){
    return(
        <SafeAreaView>
             <Card style={loginScreenStyle.card} theme={{roundness:20,}}>
                <Card.Title titleStyle={{ color:"rgba(0,153,218,200)", fontWeight:"bold", textAlign:"center"}} title="Saját adatok" ></Card.Title>
                <Card.Content>
                    <Image source={ Images.loginimage } style={loginScreenStyle.cardimage}/>
                    <Text>Teljes név: {mockfullname}</Text>
                    <Text>Neptun kód: {mockneptun}</Text>
                    <Text>Kar és szak: </Text>
                    <Text>Jelenlegi félév</Text>
                    <Text>Felvett kurzusok: </Text>
                    <Text>Teljesített sikeres tesztek: </Text>
                    <Text>Sikertelen tesztek: </Text>
                </Card.Content>
            </Card>
        </SafeAreaView>
    )
}