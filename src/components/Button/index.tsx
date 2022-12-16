import { FC, useMemo } from 'react';
import { Pressable, PressableProps, Text, StyleSheet } from 'react-native';

import { useTheme } from '../../hooks';

type Props = PressableProps & {
  children: string;
  variant: 'primary' | 'secondary';
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

export const Button: FC<Props> = ({ children, variant, ...props }) => {
  const colorPalette = useTheme();
  const styles = useMemo(
    () => ({
      button: StyleSheet.create({
        primary: {
          ...commonStyles.button,
          backgroundColor: colorPalette.buttonPrimary,
        },
        secondary: {
          ...commonStyles.button,
          borderColor: colorPalette.buttonPrimary,
          borderWidth: 3,
        },
      }),
      text: StyleSheet.create({
        primary: {
          fontSize: 20,
          letterSpacing: 0.25,
          color: colorPalette.text,
        },
        secondary: {
          fontSize: 15,
          letterSpacing: 0.25,
          color: colorPalette.text,
        },
      }),
    }),
    [colorPalette],
  );

  return (
    <Pressable {...props} style={styles.button[variant]}>
      <Text style={styles.text[variant]}>{children}</Text>
    </Pressable>
  );
};
