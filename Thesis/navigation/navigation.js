import React, {useState,useEffect, useContext} from 'react';
import {Provider as PaperProvider} from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from '../app/screens/login/loginscreen'
import MainScreen from '../app/screens/mainscreen/mainscreen'
import ChooseUserType from '../app/screens/chooseUserTypescreen/chooseUserTypescreen'
import ProfileScreen from '../app/screens/profilescreen/profilescreen'
import CourseScreen from '../app/screens/coursescreen/coursescreen'
import SettingsScreen from '../app/screens/settingsscreen/settingsscreen'
import TestListScreen from '../app/screens/testlistscreen/testlistscreen'
import TestSheetScreen from '../app/screens/testSheetScreen/testSheetScreen'
import ForgotPassword from '../app/screens/forgotPasswordscreen/forgotPasswordscreen'
import RegisterScreen from '../app/screens/registerScreen/registerScreen';
import TestEndScreen from '../app/screens/testEndScreen/testEndScreen';
import CreateTestScreen from '../app/screens/createTestScreen/createTestScreen';
import AddQuestionWithAnswer from '../app/screens/addQuestionWithAnswer/addQuestionWithAnswer';
import QuestionListScreen from '../app/screens/questionListScreen/questionListScreen';
import TestScreen from '../app/screens/testScreen/testScreen';
import CreateCourseScreen from '../app/screens/createCourseScreen/createCourseScreen';
import {theme} from '../AppStyle'

import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next'
import { AuthContext } from '../context/AuthContext';

const loginscreenName= 'Kijelentkezés'
const mainscreenName = 'Főoldal'
const profilescreenName ='Profil'
const coursescreenName ='Kurzusok'
const settingsscreenName ='Beállítások'


export default function Navigations() {
    const {userInfo,logout,getUserData} = useContext(AuthContext)
    const dispatch = useDispatch()
    const {t} = useTranslation()
    const Stack = createNativeStackNavigator();
    const BottomTabs = createBottomTabNavigator(); 

    let loginscreenName= t('logout')
    let mainscreenName = t('home')
    let profilescreenName =t('profile')
    let coursescreenName =t('courses')
    let settingsscreenName =t('settings')

    useEffect(()=>{
      getUserData(userInfo)
    },[userInfo])

   
    createCourseStack = () =>  {
        return(
        <Stack.Navigator>
          <Stack.Screen name="Kurzusaid" component={CourseScreen} initialParams={{HeaderText:coursescreenName}} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name="Tesztek" component={TestListScreen} options={{headerShown:false}} ></Stack.Screen>
          <Stack.Screen name="TestSheet" component={TestSheetScreen} options={{headerShown:false}} ></Stack.Screen>
          <Stack.Screen name="TestEndScreen" component={TestEndScreen} options={{headerShown:false}} ></Stack.Screen>
          <Stack.Screen name="AddQuestionWithAnswer" component={AddQuestionWithAnswer} options={{headerShown:false}} ></Stack.Screen>
          <Stack.Screen name="TestScreen" component={TestScreen} options={{headerShown:false}} ></Stack.Screen>
          <Stack.Screen name="CreateTest" component={CreateTestScreen} options={{headerShown:false}} ></Stack.Screen>
          <Stack.Screen name="QuestionListScreen" component={QuestionListScreen} options={{headerShown:false}} ></Stack.Screen>
          <Stack.Screen name="CreateCourse" component={CreateCourseScreen} options={{headerShown:false}} ></Stack.Screen>
        </Stack.Navigator>
        )}
   
      return (
        
        <PaperProvider theme={theme}>
        <NavigationContainer>
      
        {userInfo.access_token?
        <BottomTabs.Navigator
                initialRouteName={mainscreenName}
                screenOptions={({route})=>({
                  tabBarActiveTintColor: "#8CECFF",
                  tabBarInactiveTintColor: "white",
                    tabBarStyle:{
                      backgroundColor:'#009AB9',
                      display:'flex',
                      position:'absolute',
                      elevation:1,
                      right:10,
                      left:10,
                      borderRadius:17,
                      height:55,
                      color:'white',
                      bottom:10,
                    },
                    tabBarItemStyle:{
                      margin:6,
                    },
                    tabBarLabelStyle:{
                      fontWeight:'bold',
                    },
                    tabBarIcon:({focused,size}) =>{
                        let iconName
                        let routeName = route.name
                        if(routeName == mainscreenName){
                            iconName = focused ? 'home' : 'home-outline'
                        } else if(routeName == loginscreenName ){
                            iconName = focused ? 'log-in' : 'log-in-outline'
                        } else if(routeName==profilescreenName){
                            iconName = focused ? 'person' : 'person-outline'
                        }
                        else if(routeName==coursescreenName){
                          iconName = focused ? 'book' : 'book-outline'
                        }
                        else if(routeName==settingsscreenName){
                          iconName = focused ? 'settings' : 'settings-outline'
                        }
      
                        return <Ionicons name={iconName} size={size} color={'white'}/>
                        
                    }
                })}>
                <BottomTabs.Screen name={mainscreenName} component={MainScreen} options={{headerShown:false}}/>
                <BottomTabs.Screen name={profilescreenName} component={ProfileScreen} initialParams={{HeaderText:profilescreenName}} options={{headerShown:false}}/>
                <BottomTabs.Screen name={coursescreenName} children={createCourseStack} options={{header: () => null}}/>
                <BottomTabs.Screen name={settingsscreenName} component={SettingsScreen} initialParams={{HeaderText:settingsscreenName}} options={{headerShown:false}}/>
                <BottomTabs.Screen name={loginscreenName} component={LoginScreen} listeners={({navigation}) => ({
                  tabPress: (e) => {
                    e.preventDefault()
                    logout()
                  }
                }
                )}/>
         </BottomTabs.Navigator>:
         <Stack.Navigator>
         <Stack.Screen name="ChooseUserType" component={ChooseUserType} options={{header: () => null}}></Stack.Screen>
         <Stack.Screen name="Login" component={LoginScreen} options={{header: () => null}}></Stack.Screen>
         <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{header: () => null}}></Stack.Screen>
         <Stack.Screen name="Register" component={RegisterScreen} options={{header: () => null}}></Stack.Screen>
       </Stack.Navigator>}
        
        </NavigationContainer>
        </PaperProvider>
      )
     
      
}