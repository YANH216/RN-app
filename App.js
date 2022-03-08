import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Home from './page/Home/Home'
import Hotlist from './page/Hotlist/Hotlist'

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        initialRouteName='Home'
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if(route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline'
            } else if (route.name === 'Hotlist') {
              iconName = focused ? 'apps' : 'apps-outline'
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
          options={{
            headerShown: false
          }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}