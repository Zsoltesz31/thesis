import React from 'react'
import { SafeAreaView,View,Text, Dimensions } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import {footerStyle} from'./style'

export default function CustomFooter(){
    return(
    <View style={footerStyle.svgCurve}>
        <View stlye={footerStyle.bottom}>
            <View style={footerStyle.footer}>
        <Svg
            height={700}
            width={Dimensions.get('window').width}
            viewBox="0 0 1440 320"
          style={footerStyle.footerwavy}
        >
            <Path
            fill='#009AB9'
            d="M0,160L40,160C80,160,160,160,240,138.7C320,117,400,75,480,80C560,85,640,139,720,176C800,213,880,235,960,213.3C1040,192,1120,128,1200,128C1280,128,1360,192,1400,224L1440,256L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
            />
        </Svg>
        <View style={footerStyle.footer2}/>
        </View>
        </View>
    </View>
    )
}