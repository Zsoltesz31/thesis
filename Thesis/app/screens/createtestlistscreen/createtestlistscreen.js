import React, {useState} from 'react'
import { SafeAreaView,Text,View } from 'react-native'
import SelectList from 'react-native-dropdown-select-list'


export default function CourseScreen({navigation}){
    const [selected,setSelected] = useState("")
    //dummy hard coded data until api is done
    const data= [{key:'1',value:'Kifejtős'},{key:'2',value:"Opció választásos"}]
    const renderQuestionType=(selectedKey) =>{
        switch (selectedKey) {
            case '1':
                console.log('1')
                return(
                    <View>
                    <Text>Kifejtős</Text>
                    </View>
          
                )
            case '2':
                console.log('2')
                return(
                    <View>
                    <Text>Opciós</Text>
                    <Text>Szenzációs</Text>
                    </View>
                )
                    
            default:
                break;
        }
    }
    return(
        <SafeAreaView>
            <SelectList setSelected={setSelected} data={data}></SelectList>
            {renderQuestionType(selected)}
        </SafeAreaView>
    )
 
}