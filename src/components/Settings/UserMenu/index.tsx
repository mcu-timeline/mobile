import { FC } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useAuth } from '../../../hooks';
import { USER } from '../../../helpers';
import { UserStackParamList } from '../../../screens/types';
import { Label } from '../Label';
import { Button } from '../Button';

import { NavigationItem } from './NavigationItem';
import { LinkItem } from './LinkItem';

type Props = Pick<NativeStackScreenProps<UserStackParamList, 'Main'>, 'navigation'>;

const styles = StyleSheet.create({
  screen: {
    width: '100%',
  },
  container: {
    paddingVertical: 10,
  },
});

export const UserMenu: FC<Props> = ({ navigation }) => {
  const { logout, type } = useAuth();

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.container}>
        <Label>Account</Label>
        <NavigationItem navigation={navigation} navigateTo="AccountDetails">
          Account Details
        </NavigationItem>
        <NavigationItem navigation={navigation} navigateTo="TimelinePicker">
          Change Timeline
        </NavigationItem>
        {type === USER.TYPE.REMOTE ? (
          <NavigationItem navigation={navigation} navigateTo="Friends">
            Friends
          </NavigationItem>
        ) : null}
        <Label>Help</Label>
        <LinkItem link="https://www.apple.com/app-store/">Leave us a Review</LinkItem>
        <LinkItem link="mailto:<OUR_EMAIL>">Contact Support</LinkItem>
        <NavigationItem navigation={navigation} navigateTo="TermsAndConditions">
          Terms and Conditions
        </NavigationItem>
        <NavigationItem navigation={navigation} navigateTo="PrivacyPolicy">
          Privacy Policy
        </NavigationItem>
        <NavigationItem navigation={navigation} navigateTo="Version">
          Version
        </NavigationItem>
      </View>
      <Button onPress={logout}>Log out</Button>
      <Button danger onPress={logout}>
        Delete Account
      </Button>
    </ScrollView>
  );
};
