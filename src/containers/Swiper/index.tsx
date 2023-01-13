import { Component, ComponentType } from 'react';
import { Animated, PanResponder, PanResponderInstance } from 'react-native';
import { SCREEN_WIDTH } from '../../helpers';

type Props<T> = {
  currentItem: string | null;
  setCurrentItem: (id: string) => void;
  Item: ComponentType<{ item: T | null }>;
  items: T[];
};

type State = {
  currentItemIndex: number;
};

export class Swiper<T extends { id: string }> extends Component<Props<T>, State> {
  private panResponder: PanResponderInstance;
  private position: Animated.ValueXY;
  private isHorizontalSwipe: boolean;

  constructor(props: Props<T>) {
    super(props);
    this.state = {
      currentItemIndex: props.currentItem ? props.items.findIndex((item) => item.id === props.currentItem) : 0,
    };
    this.position = new Animated.ValueXY({ x: 0, y: 0 });
    this.isHorizontalSwipe = false;
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        switch (true) {
          case gestureState.dx > 0 || gestureState.dx < 0:
            this.isHorizontalSwipe = true;
            return true;
          case gestureState.dy > 0 || gestureState.dy < 0:
            return false;
          default:
            return false;
        }
      },
      onPanResponderMove: (_, gestureState) => {
        if (this.isHorizontalSwipe) {
          if ((gestureState.dx > 0 && this.isFirstItem()) || (gestureState.dx < 0 && this.isLastItem())) {
            this.position.setValue({ x: 0, y: 0 });
          } else {
            this.position.setValue({ x: gestureState.dx, y: 0 });
          }
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        this.isHorizontalSwipe = false;
        if (gestureState.dx > 120 && !this.isFirstItem()) {
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH, y: 0 },
            useNativeDriver: true,
          }).start(() => {
            this.props.setCurrentItem(this.props.items[this.state.currentItemIndex - 1].id);
            this.position.setValue({ x: 0, y: 0 });
          });
        } else if (gestureState.dx < -120 && !this.isLastItem()) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH, y: 0 },
            useNativeDriver: true,
          }).start(() => {
            this.props.setCurrentItem(this.props.items[this.state.currentItemIndex + 1].id);
            this.position.setValue({ x: 0, y: 0 });
          });
        } else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4,
            useNativeDriver: true,
          }).start();
        }
      },
    });
  }

  static getDerivedStateFromProps(props: Props<{ id: string }>): State {
    return {
      currentItemIndex: props.currentItem ? props.items.findIndex((item) => item.id === props.currentItem) : 0,
    };
  }

  isFirstItem() {
    return this.state.currentItemIndex === 0;
  }

  isLastItem() {
    return this.state.currentItemIndex === this.props.items.length - 1;
  }

  render() {
    const { Item, items } = this.props;
    const { currentItemIndex } = this.state;
    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={{
          flex: 1,
          flexDirection: 'row',
          width: SCREEN_WIDTH * 3,
          height: '100%',
          position: 'absolute',
          left: -SCREEN_WIDTH,
          transform: this.position.getTranslateTransform(),
        }}
      >
        <Item item={items[currentItemIndex - 1] || null} />
        <Item item={items[currentItemIndex]} />
        <Item item={items[currentItemIndex + 1] || null} />
      </Animated.View>
    );
  }
}
