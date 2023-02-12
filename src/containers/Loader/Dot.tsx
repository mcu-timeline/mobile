import { FC, useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

type Props = {
  rowIndex: number;
  columnIndex: number;
  numberOfDotsInRow: number;
  animation: Animated.Value;
};

const DOT_MAX_SIZE = 50;

const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    width: DOT_MAX_SIZE,
    height: DOT_MAX_SIZE,
    backgroundColor: '#e62429',
    borderRadius: DOT_MAX_SIZE / 2,
  },
});

export const Dot: FC<Props> = ({ rowIndex, columnIndex, numberOfDotsInRow, animation }) => {
  const animateDot = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const listenerId = animation.addListener(({ value }) => {
      animateDot.setValue(
        Math.min(
          Math.max(0, (-rowIndex / numberOfDotsInRow + value) * Math.SQRT2),
          Math.max(0, (rowIndex / numberOfDotsInRow - value + 2) * Math.SQRT2),
        ),
      );
    });
    return () => animation.removeListener(listenerId);
  }, []);

  return (
    <Animated.View
      style={[
        styles.circle,
        {
          left: columnIndex * DOT_MAX_SIZE,
          top: rowIndex * DOT_MAX_SIZE,
          transform: [
            {
              scale: animateDot,
            },
          ],
        },
      ]}
    />
  );
};
