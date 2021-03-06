import React from 'react';
import {theme} from './AppStyle'
import {Provider as PaperProvider} from 'react-native-paper'
import {Text} from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import {LoginScreen} from './app/screens/login/loginscreen'
import MainScreen from './app/screens/mainscreen/mainscreen'
import ProfileScreen from './app/screens/profilescreen/profilescreen'
import CourseScreen from './app/screens/coursescreen/coursescreen'
import SettingsScreen from './app/screens/settingsscreen/settingsscreen'
import TestListScreen from './app/screens/testlistscreen/testlistscreen'

import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'

const loginscreenName= 'Kijelentkezés'
const mainscreenName ='Főoldal'
const profilescreenName ='Profil'
const coursescreenName ='Kurzusok'
const settingsscreenName ='Beállítások'

async function componentDidMount() {
  await Font.loadAsync({
    ionicons: Ionicons.font['ionicons'] 
  });
  this.setState({ isReady: true });
}

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();


export default function App() {

  createCourseStack = () =>  {
    return(
    <Stack.Navigator>
      <Stack.Screen name="Kurzusok" component={CourseScreen} ></Stack.Screen>
      <Stack.Screen name="Tesztek" component={TestListScreen} ></Stack.Screen>
    </Stack.Navigator>
    )}

  createMainTabs = () =>  {
    return(
      <BottomTabs.Navigator
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
                    else if(routeName===coursescreenName){
                      iconName = focused ? 'book' : 'book-outline'
                    }
                    else if(routeName===settingsscreenName){
                      iconName = focused ? 'settings' : 'settings-outline'
                    }
  
                    return <Ionicons name={iconName} size={size} color={color}/>
                    
                }
            })}>
            <BottomTabs.Screen name={mainscreenName} component={MainScreen} />
            <BottomTabs.Screen name={profilescreenName} component={ProfileScreen} />
            <BottomTabs.Screen name={coursescreenName} children={createCourseStack} options={{header: () => null}}/>
            <BottomTabs.Screen name={settingsscreenName} component={SettingsScreen} />
            <BottomTabs.Screen name={loginscreenName} component={LoginScreen} listeners={({navigation}) => ({
              tabPress: (e) => {
                e.preventDefault()
                navigation.replace('Login')
              }
            }
            )}/>
     </BottomTabs.Navigator>
    )
  }


  return (
    <PaperProvider theme={theme}>
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{header: () => null}}></Stack.Screen>
      <Stack.Screen name="Main" children={createMainTabs} options={{header: () => null}}></Stack.Screen>
    </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
}


