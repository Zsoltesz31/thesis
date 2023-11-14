import React, {useEffect, useContext} from 'react';
import {Provider as PaperProvider} from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from '../app/screens/login/loginscreen'
import MainScreen from '../app/screens/mainscreen/mainscreen'
import ProfileScreen from '../app/screens/profilescreen/profilescreen'
import CourseScreen from '../app/screens/coursescreen/coursescreen'
import SettingsScreen from '../app/screens/settingsscreen/settingsscreen'
import TestListScreen from '../app/screens/testlistscreen/testlistscreen'
import TestSheetScreen from '../app/screens/testSheetScreen/testSheetScreen'
import RegisterScreen from '../app/screens/registerScreen/registerScreen';
import CheckedTestsScreen from '../app/screens/checkedTestsScreen/checkedTestScreen';
import CreateTestScreen from '../app/screens/createTestScreen/createTestScreen';
import AddQuestionWithAnswer from '../app/screens/addQuestionWithAnswer/addQuestionWithAnswer';
import QuestionListScreen from '../app/screens/questionListScreen/questionListScreen';
import TestScreen from '../app/screens/testScreen/testScreen';
import CreateCourseScreen from '../app/screens/createCourseScreen/createCourseScreen';
import UsersToCourse from '../app/screens/usersToCourse/usersToCourse';
import CheckedTestQuestionsListScreen from '../app/screens/checkedTestQuestionsListScreen/checkedTestQuestionsListScreen';
import IosScreenToPublishTest from '../app/screens/iosScreenToPublishTest/iosScreenToPublishTest';
import FilledTestListinForTeachers from '../app/screens/filledTestListinForTeachers/filledTestListinForTeachers';
import QuestionAnswersForTeachersScreen from '../app/screens/questionAnswersForTeachersScreen/questionAnswersForTeachersScreen';
import ForgotPasswordScreen from '../app/screens/forgotPasswordscreen/forgotPasswordscreen';
import {theme} from '../AppStyle'

import { useLayoutEffect } from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next'
import { AuthContext } from '../context/AuthContext';
import { SafeAreaView } from 'react-native';

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
   
    createCourseStack = ({navigation,route}) =>  {

        useLayoutEffect(()=>{
          const routeName=getFocusedRouteNameFromRoute(route)
          if(routeName==='TestScreen'){
            navigation.setOptions({tabBarStyle:{display:'none'}})
          } else{
            navigation.setOptions({
              tabBarStyle: {
                backgroundColor: '#009aB9',
                marginHorizontal: 8,
                borderRadius: 17,
                marginBottom: 10,
                height: 65,
                padding: 8,

              },
              tabBarItemStyle: {
                
              },
              tabBarLabelStyle: {
                marginBottom: 8,
              },
        })
          }
        },[navigation,route])

        return(
        <Stack.Navigator>
          <Stack.Screen name="Kurzusaid" component={CourseScreen} initialParams={{HeaderText:coursescreenName}} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name="Tesztek" component={TestListScreen} options={{headerShown:false}} ></Stack.Screen>
          <Stack.Screen name="TestSheet" component={TestSheetScreen} options={{headerShown:false}} ></Stack.Screen>
          <Stack.Screen name="IosPublish" component={IosScreenToPublishTest} options={{headerShown:false}} ></Stack.Screen>
          <Stack.Screen name="CheckedTestsScreen" component={CheckedTestsScreen} options={{headerShown:false}} ></Stack.Screen>
          <Stack.Screen name="AddQuestionWithAnswer" component={AddQuestionWithAnswer} options={{headerShown:false}} ></Stack.Screen>
          <Stack.Screen name="CreateTest" component={CreateTestScreen} options={{headerShown:false}} ></Stack.Screen>
          <Stack.Screen name="QuestionListScreen" component={QuestionListScreen} options={{headerShown:false}} ></Stack.Screen>
          <Stack.Screen name="CreateCourse" component={CreateCourseScreen} options={{headerShown:false}} ></Stack.Screen>
          <Stack.Screen name="UsersToCourse" component={UsersToCourse} options={{headerShown:false}} ></Stack.Screen>
          <Stack.Screen name="TestScreen" component={TestScreen} options={{headerShown:false}} ></Stack.Screen>
          <Stack.Screen name="CheckedTestQuestionsListScreen" component={CheckedTestQuestionsListScreen} options={{headerShown:false}} ></Stack.Screen>
          <Stack.Screen name="FilledTestListinForTeachers" component={FilledTestListinForTeachers} options={{headerShown:false}} ></Stack.Screen>
          <Stack.Screen name="QuestionAnswersForTeachersScreen" component={QuestionAnswersForTeachersScreen} options={{headerShown:false}} ></Stack.Screen>
        </Stack.Navigator>
        )}
   
      return (
        
        <PaperProvider theme={theme}>
          

        <NavigationContainer>
      
        {userInfo.access_token?
        <>
        <BottomTabs.Navigator
                initialRouteName={mainscreenName}
                screenOptions={({route})=>({
                  tabBarActiveTintColor: "#8CECFF",
                  tabBarInactiveTintColor: "white",
                    tabBarStyle: {
                      backgroundColor: '#009aB9',
                      marginHorizontal: 8,
                      borderRadius: 17,
                      marginBottom: 10,
                      height: 65,
                      padding: 8,

                    },
                    tabBarItemStyle: {
                      
                    },
                    tabBarLabelStyle: {
                      marginBottom: 8,
                    },
                    tabBarIcon:({focused,size}) =>{
                        let iconName
                        let routeName = route.name
                        if(routeName == mainscreenName){
                            iconName = focused ? 'home' : 'home-outline'
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

                    
                })}
                safeAreaInsets={{bottom: 0}}
                >
                <BottomTabs.Screen name={mainscreenName} component={MainScreen} options={{headerShown:false}}/>
                <BottomTabs.Screen name={profilescreenName} component={ProfileScreen} initialParams={{HeaderText:profilescreenName}} options={{headerShown:false}}/>
                <BottomTabs.Screen name={coursescreenName} children={createCourseStack} options={{header: () => null}}/>
                <BottomTabs.Screen name={settingsscreenName} component={SettingsScreen} initialParams={{HeaderText:settingsscreenName}} options={{headerShown:false}}/>          
         </BottomTabs.Navigator>
        <SafeAreaView style={{backgroundColor: 'transparent'}}/>
         </>
         :
         <Stack.Navigator>
         <Stack.Screen name="Login" component={LoginScreen} options={{header: () => null}}></Stack.Screen>
         <Stack.Screen name="Register" component={RegisterScreen} options={{header: () => null}}></Stack.Screen>
         <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{headerShown:false}} ></Stack.Screen>
         </Stack.Navigator>}
        
        </NavigationContainer>
        </PaperProvider>
      )
     
      
}