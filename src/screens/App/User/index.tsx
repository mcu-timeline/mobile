import { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { UserStackParamList } from '../../types';

import { MainScreen } from './Main';
import { AccountDetailsScreen } from './AccountDetails';
import { TimelinePickerScreen } from './TimelinePicker';
import { TermsAndConditionsScreen } from './TermsAndConditions';
import { PrivacyPolicyScreen } from './PrivacyPolicy';
import { VersionScreen } from './Version';

const Stack = createNativeStackNavigator<UserStackParamList>();

export const UserScreen: FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: true,
      headerTintColor: '#ffffff',
      headerShadowVisible: false,
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: '#000000',
      },
      headerTitleStyle: {
        color: '#ffffff',
      },
    }}
  >
    <Stack.Screen name="Main" component={MainScreen} options={{ headerTitle: 'Settings' }} />
    <Stack.Screen name="AccountDetails" component={AccountDetailsScreen} options={{ headerTitle: 'Account Details' }} />
    <Stack.Screen name="TimelinePicker" component={TimelinePickerScreen} options={{ headerTitle: 'Change Timeline' }} />
    <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} />
    <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
    <Stack.Screen name="Version" component={VersionScreen} />
  </Stack.Navigator>
);
