import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import {eng} from './eng'
import {hu} from './hu'

const {languageDetector} = require('./languageDetector')

const resources ={
    eng:{
        translation: eng
    },
    hu:{
        translation: hu
    }
}

i18n.use(initReactI18next).use(languageDetector).init({
    compatibilityJSON: 'v3',
    resources,
    fallbackLng:"hu",
    interpolation:{
        escapeValue:false,
    },
    react: {
        useSuspense:false
    }
})

export default i18n