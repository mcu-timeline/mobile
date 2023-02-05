import { FC } from 'react';
import { Pressable, PressableProps, StyleSheet, Text } from 'react-native';

type Props = PressableProps & {
  children: string;
  danger?: boolean;
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    backgroundColor: '#000000',
  },
  textDanger: {
    color: '#e62429',
    textAlign: 'center',
    fontSize: 16,
  },
  text: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export const Button: FC<Props> = ({ children, danger, ...props }) => (
  <Pressable style={styles.container} {...props}>
    <Text style={danger ? styles.textDanger : styles.text}>{children}</Text>
  </Pressable>
);
