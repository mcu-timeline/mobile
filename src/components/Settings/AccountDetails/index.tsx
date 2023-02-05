import { FC } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { useAuth } from '../../../hooks';
import { USER } from '../../../helpers';

import { Label } from '../Label';
import { TextItem } from '../TextItem';
import { Button } from '../Button';

const styles = StyleSheet.create({
  screen: {
    width: '100%',
  },
  container: {
    paddingVertical: 10,
  },
});

export const AccountDetails: FC = () => {
  const { type, user } = useAuth();

  if (type === USER.TYPE.LOCAL || !user) {
    return (
      <ScrollView style={styles.screen}>
        <View style={styles.container}>
          <Label>Account</Label>
          <TextItem>Anonymous</TextItem>
          <TextItem center>Log in to set your user name and compare your watching progress with your friends</TextItem>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.container}>
        <Label>Email</Label>
        <TextItem>{user.email}</TextItem>
        <Label>User Name</Label>
        <TextItem>{user.nickname}</TextItem>
      </View>
      <Button onPress={() => {}}>Save Changes</Button>
    </ScrollView>
  );
};
