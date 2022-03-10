import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { updataIsEnable } from './../../redux/actions';

import Home from '../../page/Home/Home'
import Hotlist from '../Hotlist/Hotlist'
import Setting from '../Setting/Setting'
import Map from '../../page/Map/Map'

const Tab = createBottomTabNavigator()

function BottomTab(props) {

 const { isEnable, updataIsEnable } = props

  const getData = async () => {
      try {
          const value = await AsyncStorage.getItem('@storage_Key')
          if(value !== null) {
            updataIsEnable(value)
          }
      } catch(e) {
        alert('读取本地存储数据失败')
      }
  }

  // 根据setting组件改变redux中状态之后 判断是否显示Map的tab

  const showTab = () => {
    if(isEnable) {
        return (
            <Tab.Screen 
                name='Map' 
                component={Map}
            />
        )
    }
  }

  useEffect(() => {
      getData()
  }, [])

  return (
    <Tab.Navigator 
        initialRouteName='Home'
        screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if(route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline'
            } else if (route.name === 'Hotlist') {
            iconName = focused ? 'apps' : 'apps-outline'
            } else if (route.name === 'Map') {
            iconName = focused ? 'map' : 'map-outline'
            } else if (route.name === 'Setting') {
            iconName = focused ? 'settings' : 'settings-outline'
            }

            return <Ionicons name={ iconName } size={ size } color={ color }/>
        }
        })}
    >
    <Tab.Screen 
        name='Home' 
        component={Home}
        options={{
            headerShown: false
        }} 
    />
    <Tab.Screen 
        name='Hotlist' 
        component={Hotlist}
    />
    {
        showTab()
    }
    <Tab.Screen 
        name='Setting' 
        component={Setting}
    />
    </Tab.Navigator>
  )
}

export default connect(
    state => ({
        isEnable: state.isEnable
    }), { updataIsEnable }
)(BottomTab)