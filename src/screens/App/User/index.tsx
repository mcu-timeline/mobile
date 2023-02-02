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
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Main" component={MainScreen} />
    <Stack.Screen name="AccountDetails" component={AccountDetailsScreen} />
    <Stack.Screen name="TimelinePicker" component={TimelinePickerScreen} />
    <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} />
    <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
    <Stack.Screen name="Version" component={VersionScreen} />
  </Stack.Navigator>
);
