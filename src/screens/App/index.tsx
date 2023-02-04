import { FC } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Movies, TabsBackground, User } from '../../components/Tabs';

import { AppTabsParamList, RootStackParamList } from '../types';
import { MoviesScreen } from './Movies';
import { UserScreen } from './User';

const Tab = createBottomTabNavigator<AppTabsParamList>();

export const AppTabs: FC<NativeStackScreenProps<RootStackParamList, 'App'>> = () => (
  <Tab.Navigator
    initialRouteName="Movies"
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarBackground: TabsBackground,
      tabBarActiveTintColor: '#e62429',
      tabBarInactiveTintColor: '#767676',
      tabBarStyle: {
        borderTopColor: '#393939',
        borderTopWidth: 1,
      },
    }}
  >
    <Tab.Screen
      name="Movies"
      component={MoviesScreen}
      options={{
        tabBarIcon: Movies,
      }}
    />
    <Tab.Screen
      name="User"
      component={UserScreen}
      options={{
        tabBarIcon: User,
        headerShown: true,
        headerTitle: 'Settings',
        headerStyle: {
          backgroundColor: '#000000',
          borderBottomColor: '#393939',
          borderBottomWidth: 1,
        },
        headerTitleStyle: {
          color: '#ffffff',
        },
      }}
    />
  </Tab.Navigator>
);
