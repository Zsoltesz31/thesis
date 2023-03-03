import React from 'react'
import { SafeAreaView,View,Text, Dimensions } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import {headerStyle} from'./style'

export default function CustomHeader(){
    return(
    <View style={headerStyle.svgCurve}>
        <View stlye={headerStyle.top}>
            <View style={headerStyle.header}>
        <Svg
            height={250}
            width={Dimensions.get('window').width}
            viewBox="0 0 1440 320"
          style={headerStyle.headerWavy}
        >
            <Path
            fill='#009AB9'
            d="M0,160L48,149.3C96,139,192,117,288,128C384,139,480,181,576,213.3C672,245,768,267,864,245.3C960,224,1056,160,1152,144C1248,128,1344,160,1392,176L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            />
        </Svg>
        </View>
        </View>
    </View>
    )
}