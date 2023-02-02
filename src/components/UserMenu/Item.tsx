import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

type Props = { children: string };

const styles = StyleSheet.create({
  text: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export const Item: FC<Props> = ({ children }) => (
  <>
    <View>
      <Text style={styles.text}>{children}</Text>
    </View>
    <View>
      <Svg height={16} width={8} viewBox="0 0 32 64">
        <Path d="M 2 2 L 30 32 L 2 62" strokeLinejoin="round" stroke="#ffffff" strokeWidth="4" />
      </Svg>
    </View>
  </>
);
