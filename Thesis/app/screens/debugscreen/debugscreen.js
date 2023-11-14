import { View, Text } from 'react-native'
import React from 'react'
import { Pressable } from 'react-native'

const Debugscreen = () => {
  return (
    <View>
    <Pressable onPress={()=>console.log('asd')}>
      <Text>debugscreen</Text>
    </Pressable>
    </View>
  )
}

export default Debugscreen