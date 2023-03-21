import React, {useState} from "react"
import { SafeAreaView,View,Text } from "react-native"
import { CustomButton } from "../../../components/buttons/buttons"
import { CustomInput } from "../../../components/inputs/inputs"
import CustomHeader from "../../../components/header/header"
import CustomFooter from '../../../components/footer/footer';
import { registerScreenStyle } from "./style";

import { useDispatch } from "react-redux"



export default function RegisterScreen({navigation,route}){
    const dispatch = useDispatch()

    const [outlineColorNames,setoutlineColorNames]=useState('#009AB9')
    const [outlineColorEmail,setoutlineColorEmail]=useState('#009AB9')
    const [outlineColorPw,setoutlineColorPw]=useState('#009AB9')

    const [firstName,setFirstName]=useState('')
    const [lastName,setLastName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [password2,setPassword2]=useState('')

    const [nameErrors,setNameErrors] = useState('')
    const [emailErrors,setEmailErrors] = useState('')
    const [passwordErrors,setPasswordErrors] = useState('')
    const [registerError,setRegisterError] = useState('')

    //client side validation functions

    const validateEmail = (email) =>{
        var re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
        if(email==''){
            return (
                setEmailErrors('Az e-mail mező nem lehet üresen!'),
                setoutlineColorEmail('red')
                )
        }
        if(!re.test(email)){
            return(
                setEmailErrors('A beírt e-mail nem megfelelő formátummal rendelkezik!'),
             setoutlineColorEmail('red')
            )
        }
        else{
            return(
                setoutlineColorEmail('#009AB9'),
                setEmailErrors('')
            )
        }
    }

    const validateNames = (firstName,lastName) =>{
        if(firstName=='' || lastName==''){
            return (
                console.log(firstName),
                setNameErrors('A név mezőket nem lehet üresen hagyni!'),
                setoutlineColorNames('red')
                )
        }
        else{
            return(
                setoutlineColorNames('#009AB9'),
                setNameErrors('')
            )
        }
    }

    const validatePassword = (password,password1) =>{
        if(password1.length <=0 || password.length<=0 )
        {
            return(
                setPasswordErrors('A jelszó mező nem lehet üresen!'),
                setoutlineColorPw('red')
            )
        }
        if(password!=password1 ){
            return(
                setPasswordErrors('A két jelszó nem egyezik!'),
                setoutlineColorPw('red')
            )
        }
        else{
            return(
                setoutlineColorPw('#009AB9'),
                setPasswordErrors('')
            )
        }
    }

    const validateAll = (firstName,lastName,email,password,password1) =>{
        let validatePass=false
        validateEmail(email)
        validatePassword(password,password1)
        validateNames(firstName,lastName)
       
        if(nameErrors=='' && emailErrors=='' && passwordErrors==''){
            validatePass=true
        }
        else{
            validatePass=false
        }
        return(
            validatePass
        )
        
    }

    const register = (firstName,lastName,email,password,password1)=>{
        if(validateAll(firstName,lastName,email,password,password1)==true){
            console.log('succes')
            let user = {
                firstName:firstName,
                lastName:lastName,
                email:email,
                password:password
            }
            dispatch(createUser(user))
        }
        
    
    }


    return(
        <SafeAreaView>
            <CustomHeader/>
                <Text style={registerScreenStyle.screenTitle}>Regisztráció</Text>
                <View style={registerScreenStyle.registerFormContainer}>
                    <View style={registerScreenStyle.inputs}>
                    <Text style={registerScreenStyle.formTitle}>{route.params.loginType=='student'? 'Hallgatóknak' : 'Oktatóknak'}</Text>
                    <CustomInput label='Vezetéknév'  onChangeTextEvent={text => setFirstName(text)} outlineColor={outlineColorNames} />
                    <CustomInput label='Keresztnév' onChangeTextEvent={text => setLastName(text)} outlineColor={outlineColorNames} />
                    {nameErrors.length>0 && 
                    <Text>
                        {nameErrors}
                    </Text>
                    }
                    <CustomInput label='E-mail cím' onChangeTextEvent={text => setEmail(text)} outlineColor={outlineColorEmail}/>
                    {emailErrors.length>0 && 
                    <Text>
                        {emailErrors}
                    </Text>
                    }
                    <CustomInput label='Jelszó'  onChangeTextEvent={text => setPassword(text)} outlineColor={outlineColorPw}/>
                    <CustomInput label='Jelszó újra'  onChangeTextEvent={text => setPassword2(text)} outlineColor={outlineColorPw}/>
                    {passwordErrors.length>0 && 
                    <Text>
                        {passwordErrors}
                    </Text>
                    }
                    </View>
                    <View style={registerScreenStyle.buttons}>
                        <CustomButton buttonName='Regisztráció' onPress={ ()=>{register(firstName,lastName,email,password,password2)}}/>
                            {registerError.length>0 && 
                            <Text>
                                {registerError}
                            </Text>
                            }
                        <CustomButton buttonName='Vissza' onPress={()=>navigation.navigate('Login',{loginType:route.params.loginType})}/>
                    </View>
                </View>
            <CustomFooter/>
        </SafeAreaView>
    )
}