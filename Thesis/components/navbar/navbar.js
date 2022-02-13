import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons';

import {LoginScreen} from '../../app/screens/login/loginscreen'
import MainScreen from '../../app/screens/mainscreen/mainscreen'
import ProfileScreen from '../../app/screens/profilescreen/profilescreen'

const loginscreenName= 'Login'
const mainscreenName ='Main'
const profilescreenName ='Profile'

const Tab = createBottomTabNavigator()

async function componentDidMount() {
    await Font.loadAsync({
      ionicons: Ionicons.font['ionicons'] 
    });
    this.setState({ isReady: true });
  }


export default function Navbar(){
    return(
    
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName={mainscreenName}
            screenOptions={({route})=>({
                tabBarIcon:({focused,color,size}) =>{
                    let iconName
                    let routeName = route.name

                    if(routeName === mainscreenName){
                        iconName = focused ? 'home' : 'home-outline'
                    } else if(routeName === loginscreenName){
                        iconName = focused ? 'log-in' : 'log-in-outline'
                    } else if(routeName===profilescreenName){
                        iconName = focused ? 'person' : 'person-outline'
                    }

                    return <Ionicons name={iconName} size={size} color={color}/>
                    
                }
            })}>
            <Tab.Screen name={loginscreenName} component={LoginScreen} options={{header: () => null}} />

            </Tab.Navigator>
        </NavigationContainer>
    )
}