import { Component, ComponentType } from 'react';
import { Animated, PanResponder, PanResponderInstance } from 'react-native';
import { SCREEN_WIDTH } from '../../helpers';

type Props<T> = {
  currentItem: string;
  setCurrentItem: (id: string) => void;
  Item: ComponentType<{ item: T }>;
  items: T[];
};

type State = {
  currentItemIndex: number;
};

export class Swiper<T extends { name: string }> extends Component<Props<T>, State> {
  private panResponder: PanResponderInstance;
  private position: Animated.ValueXY;
  private verticalDrag: Animated.Value;
  private isDragging: boolean;
  private isHorizontalSwipe: boolean;
  private isVerticalSwipe: boolean;

  constructor(props: Props<T>) {
    super(props);
    this.state = {
      currentItemIndex: props.items.findIndex((item) => item.name === props.currentItem),
    };
    this.position = new Animated.ValueXY({ x: 0, y: 0 });
    this.verticalDrag = new Animated.Value(0);
    this.isDragging = false;
    this.isHorizontalSwipe = false;
    this.isVerticalSwipe = false;
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        if (this.isDragging) {
          if (this.isHorizontalSwipe) {
            this.position.setValue({ x: gestureState.dx, y: 0 });
          } else if (this.isVerticalSwipe) {
            this.verticalDrag.setValue(Math.max(0, gestureState.dy));
            // TODO Handle transition to timeline
          }
        } else {
          if (gestureState.dx > 10 || gestureState.dx < -10) {
            this.isDragging = true;
            this.isHorizontalSwipe = true;
          } else if (gestureState.dy > 10) {
            this.isDragging = true;
            this.isVerticalSwipe = true;
          }
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        this.isDragging = false;
        this.isHorizontalSwipe = false;
        this.isVerticalSwipe = false;
        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH, y: 0 },
            useNativeDriver: true,
          }).start(() => {
            this.props.setCurrentItem(this.props.items[this.state.currentItemIndex - 1].name);
            this.position.setValue({ x: 0, y: 0 });
          });
        } else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH, y: 0 },
            useNativeDriver: true,
          }).start(() => {
            this.props.setCurrentItem(this.props.items[this.state.currentItemIndex + 1].name);
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

  static getDerivedStateFromProps(props: Props<{ name: string }>): State {
    return {
      currentItemIndex: props.items.findIndex((item) => item.name === props.currentItem),
    };
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
        <Item item={items[currentItemIndex - 1]} />
        <Item item={items[currentItemIndex]} />
        <Item item={items[currentItemIndex + 1]} />
      </Animated.View>
    );
  }
}
