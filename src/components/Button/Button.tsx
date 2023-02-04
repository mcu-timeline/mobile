import { FC } from 'react';
import { Pressable, PressableProps, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';

type Props = PressableProps & {
  children: string;
  variant: 'primary' | 'secondary';
  style?: StyleProp<ViewStyle>;
};

const commonStyles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    margin: 10,
    height: 70,
    width: '80%',
  },
});

const styles = {
  button: StyleSheet.create({
    primary: {
      ...commonStyles.button,
      backgroundColor: '#ffffff50',
    },
    secondary: {
      ...commonStyles.button,
      borderColor: '#ffffff50',
      borderWidth: 3,
    },
  }),
  text: StyleSheet.create({
    primary: {
      fontSize: 20,
      letterSpacing: 0.25,
      color: '#ffffff',
    },
    secondary: {
      fontSize: 15,
      letterSpacing: 0.25,
      color: '#ffffff',
    },
  }),
};

export const Button: FC<Props> = ({ children, variant, style, ...props }) => (
  <Pressable {...props} style={[styles.button[variant], style]}>
    <Text style={styles.text[variant]}>{children}</Text>
  </Pressable>
);
