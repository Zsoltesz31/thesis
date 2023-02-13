import AsyncStorage from "@react-native-async-storage/async-storage"
import * as Localization from "expo-localization"

const STORE_LANGUAGE_KEY="settings.lang"

export const languageDetector = {
    type: "languageDetector",
    async: true,
    init: () => {},
    detect: async function (callback){
        try{
            await AsyncStorage.getItem(STORE_LANGUAGE_KEY).then((language)=>{
            if(language){ //ha volt már eltárolva nyelv akkor ugyanazt tölti vissza
                return callback(language)
            } else { //ha nincs eltárolva semmit akkor a készülék lokális nyelvét fogja használni
                return callback(Localization.locale)
            }
            })
        } catch(error){
            console.log("Error loading in language",error)
        }
    },
    cacheUserLanguage: async function (language) {
        try{
            await AsyncStorage.setItem(STORE_LANGUAGE_KEY,language)
            console.log(language) 
        } catch (error){
            console.log(error)
        }
    }
}

