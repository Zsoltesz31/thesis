import React from 'react';
import { SafeAreaView } from 'react-native'

import Navbar from '../../components/navbar/navbar'

export const ScreenContainer=() => {
    return(
        <SafeAreaView>
            <Navbar></Navbar>
        </SafeAreaView>
    )
}