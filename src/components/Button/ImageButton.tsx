import { FC } from 'react';
import {
  Pressable,
  PressableProps,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Image,
  ImageSourcePropType,
} from 'react-native';

type Props = PressableProps & {
  style?: StyleProp<ViewStyle>;
  imageSource: ImageSourcePropType;
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    margin: 10,
    height: 70,
    width: 70,
  },
  image: {
    height: '100%',
    aspectRatio: 1,
    borderRadius: 35,
  },
});

export const ImageButton: FC<Props> = ({ children, style, imageSource, ...props }) => (
  <Pressable {...props} style={[styles.button, style]}>
    <Image source={imageSource} style={styles.image} />
  </Pressable>
);
