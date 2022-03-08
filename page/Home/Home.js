import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeContent from '../HomeContent/HomeContent'
import Item from '../Item/Item';

const Stack = createNativeStackNavigator()

export default function Home() {
  return (
    <Stack.Navigator>
        <Stack.Screen name='HomeContent' component={HomeContent} />
        <Stack.Screen name='Item' component={Item} />
    </Stack.Navigator>
  )
}