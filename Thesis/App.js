import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navigations from './navigation/navigation.js'
import './translations/i18config'
import { Provider as StoreProvider} from "react-redux"
import store from "./store"

export default function App() {
 
  return (
    <StoreProvider store={store}>
  <Navigations/>
  </StoreProvider>
  )
}

