import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, StyleSheet, useWindowDimensions, View } from 'react-native';

import { Logo } from '../../components/Logo';
import { Dot } from './Dot';

type Props = {
  visible: boolean;
};

const DOT_MAX_SIZE = 50;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    transform: [{ rotate: '30deg' }],
    alignContent: 'center',
    justifyContent: 'flex-end',
  },
  overlayBackground: {
    backgroundColor: '#000000',
    height: '100%',
  },
  logoContainer: {
    position: 'absolute',
  },
});

export const Loader: FC<Props> = ({ visible }) => {
  const { width, height } = useWindowDimensions();
  const [shouldRender, setShouldRender] = useState(visible);
  const animation = useRef(new Animated.Value(visible ? 0 : 3)).current;

  const diagonal = useMemo(() => Math.sqrt(width ** 2 + height ** 2), [width, height]);
  const numberOfDotsInRow = useMemo(() => Math.ceil(diagonal / DOT_MAX_SIZE), [diagonal]);
  const fullSizeStyles = useMemo(() => ({ width: diagonal, height: diagonal }), [diagonal]);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      Animated.timing(animation, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 3,
        duration: 2000,
        useNativeDriver: false,
      }).start(() => setShouldRender(false));
    }
  }, [visible, setShouldRender]);

  if (!shouldRender) {
    return null;
  }

  return (
    <Animated.View style={[styles.container]}>
      <View style={[styles.overlay, fullSizeStyles]}>
        <Animated.View
          style={[
            styles.overlayBackground,
            {
              transform: [
                {
                  translateY: animation.interpolate({
                    inputRange: [0, 1, 2],
                    outputRange: [0, 0, diagonal],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}
        />
      </View>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: animation.interpolate({
              inputRange: [0, 1.5, 1.5, 3],
              outputRange: [1, 1, 0, 0],
            }),
          },
        ]}
      >
        <Logo color="#ffffff" />
      </Animated.View>
      <View style={[styles.overlay, fullSizeStyles]}>
        {Array.from({ length: numberOfDotsInRow }).map((_, rowIndex) =>
          Array.from({ length: numberOfDotsInRow }).map((_, columnIndex) => (
            <Dot
              key={`${rowIndex}-${columnIndex}`}
              columnIndex={columnIndex}
              rowIndex={rowIndex}
              numberOfDotsInRow={numberOfDotsInRow}
              animation={animation}
            />
          )),
        )}
      </View>
    </Animated.View>
  );
};
