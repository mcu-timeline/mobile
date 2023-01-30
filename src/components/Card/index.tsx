import { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../helpers';
import { Tag } from '../Tag';
import { Button, ImageButton } from '../Button';
import { Movie } from '../../types';
import { Separator } from '../Separator';

type Props = {
  item: Movie | null;
  width?: number;
  setDisableSwipe?: (value: boolean) => void;
  moveToNextItem?: () => void;
};

const MIN_HEADER_HEIGHT = Math.min((SCREEN_WIDTH / 2) * 3, SCREEN_HEIGHT * 0.7) * 0.4;
const STOP_ZOOMING_AT = (SCREEN_WIDTH / 2) * 3 * 0.2;
const BIG_NUMBER = 2000;
const ZOOM_FACTOR = 1.2;

const DEFAULT_IMAGE_CENTER = 1;

const styles = StyleSheet.create({
  image: { width: '100%', height: undefined, aspectRatio: 2 / 3 },
  imageHero: { width: '100%', height: undefined, aspectRatio: 2 / 3, position: 'absolute', top: 0 },
  imageContainer: {
    width: '100%',
    overflow: 'hidden',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
    maxHeight: '80%',
  },
  container: {
    padding: 0,
    width: SCREEN_WIDTH,
  },
  content: {
    backgroundColor: '#000000',
    width: '100%',
    paddingHorizontal: 10,
  },
  gradient: {
    width: '100%',
    height: 70,
    position: 'absolute',
    bottom: 0,
  },
  tags: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 10,
    flexDirection: 'row',
  },
  title: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 20,
    marginVertical: 20,
  },
  note: {
    color: '#ffffff',
    fontWeight: '400',
    fontSize: 18,
  },
  description: {
    color: '#ffffff',
    marginVertical: 10,
    fontSize: 16,
    lineHeight: 24,
  },
  button: {
    alignSelf: 'center',
  },
});

export const Card: FC<Props> = ({ item, setDisableSwipe, moveToNextItem }) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    pan.setValue({ x: 0, y: 0 });
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: false });
  }, [item]);

  const disableSwipe = useCallback(() => {
    if (setDisableSwipe) {
      setDisableSwipe(true);
    }
  }, [setDisableSwipe]);

  const enableSwipe = useCallback(() => {
    if (setDisableSwipe) {
      setDisableSwipe(false);
    }
  }, [setDisableSwipe]);

  if (!item) {
    return <View style={styles.container} />;
  }

  const ZOOMED_IMAGE_TRANSLATION = useMemo(
    () => (STOP_ZOOMING_AT - (item.imageCenter ?? DEFAULT_IMAGE_CENTER) * STOP_ZOOMING_AT * ZOOM_FACTOR) * ZOOM_FACTOR,
    [item],
  );

  return (
    <Animated.ScrollView
      style={styles.container}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: pan.y } } }], {
        useNativeDriver: false,
      })}
      scrollEventThrottle={10}
      showsVerticalScrollIndicator={false}
      ref={scrollViewRef}
    >
      <Animated.View
        style={{
          ...styles.imageContainer,
          transform: [
            {
              translateY: pan.y.interpolate({
                inputRange: [MIN_HEADER_HEIGHT, BIG_NUMBER],
                outputRange: [0, BIG_NUMBER - MIN_HEADER_HEIGHT],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}
      >
        <Animated.Image
          style={{
            ...styles.image,
            transform: [
              {
                translateY: pan.y.interpolate({
                  inputRange: [0, MIN_HEADER_HEIGHT],
                  outputRange: [0, MIN_HEADER_HEIGHT],
                  extrapolate: 'clamp',
                }),
              },
            ],
          }}
          source={{ uri: item.image }}
        />
        <Animated.Image
          style={{
            ...styles.imageHero,
            transform: [
              {
                scale: pan.y.interpolate({
                  inputRange: [0, STOP_ZOOMING_AT],
                  outputRange: [1, ZOOM_FACTOR],
                  extrapolate: 'clamp',
                }),
              },
              {
                translateY: pan.y.interpolate({
                  inputRange: [0, STOP_ZOOMING_AT, MIN_HEADER_HEIGHT],
                  outputRange: [
                    0,
                    ZOOMED_IMAGE_TRANSLATION,
                    ZOOMED_IMAGE_TRANSLATION + (MIN_HEADER_HEIGHT - STOP_ZOOMING_AT) / ZOOM_FACTOR,
                  ],
                  extrapolate: 'clamp',
                }),
              },
            ],
          }}
          source={{ uri: item.imageHero }}
        />
        <LinearGradient colors={['transparent', '#000000']} locations={[0, 0.8]} style={styles.gradient} />
        <View style={styles.tags}>
          <Tag gap={10}>{item.duration}</Tag>
          {item.tags.map((tag) => (
            <Tag key={tag} gap={10}>
              {tag}
            </Tag>
          ))}
        </View>
      </Animated.View>
      <View style={styles.content}>
        <Text style={styles.title}>
          {item.title}
          {item.note ? <Text style={styles.note}> ({item.note})</Text> : null}
        </Text>
        <Text style={styles.description}>{item.description}</Text>
        <Button style={styles.button} onPress={moveToNextItem} variant="secondary">
          Mark as Watched
        </Button>
        <Separator>Available on:</Separator>
        <ImageButton imageSource={require('../../assets/images/disney-plus.webp')} />
        <Separator>Featuring:</Separator>
        <ScrollView horizontal onTouchStart={disableSwipe} onScrollEndDrag={enableSwipe}>
          {item.characters.map((character) => (
            <Image
              source={{ uri: character.image }}
              style={{ height: 100, aspectRatio: 1, marginRight: 10 }}
              key={character.name}
            />
          ))}
        </ScrollView>
      </View>
    </Animated.ScrollView>
  );
};
