import { ImageBackground, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Layout } from '../../components/Layout';
import { LoginForm } from '../../components/LoginForm';
import { Logo } from '../../components/Logo';

const styles = StyleSheet.create({
  backgroundContainer: { position: 'absolute', width: '100%', height: '75%', top: 0 },
  backgroundImage: { resizeMode: 'cover', height: '133%', top: undefined },
  gradient: { position: 'absolute', width: '100%', height: '35%', bottom: 0 },
  logo: { marginTop: 40 },
});

export const LoginScreen = () => (
  <View style={{ flex: 1 }}>
    <Layout>
      <ImageBackground
        style={styles.backgroundContainer}
        imageStyle={styles.backgroundImage}
        source={require('../../assets/images/background.jpg')}
      />
      <LinearGradient colors={['transparent', '#000000']} locations={[0, 0.25]} style={styles.gradient} />
      <Logo style={styles.logo} />
      <LoginForm />
    </Layout>
  </View>
);
