import { Component } from 'react';
import { Animated, PanResponder, PanResponderInstance } from 'react-native';

import { Card } from '../../components/Card';
import { SCREEN_WIDTH } from '../../helpers';
import { Movie } from '../../types';

type Props = {
  currentItem: string | null;
  setCurrentItem: (id: string) => void;
  items: Movie[];
};

type State = {
  currentItemIndex: number;
};

export class Swiper extends Component<Props, State> {
  private panResponder: PanResponderInstance;
  private position: Animated.ValueXY;
  private isHorizontalSwipe: boolean;
  private disableSwipe: boolean;

  constructor(props: Props) {
    super(props);
    this.state = {
      currentItemIndex: props.currentItem ? props.items.findIndex((item) => item.id === props.currentItem) : 0,
    };
    this.position = new Animated.ValueXY({ x: 0, y: 0 });
    this.isHorizontalSwipe = false;
    this.disableSwipe = false;
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        if (this.disableSwipe) {
          return false;
        }
        if (gestureState.dx > 10 || gestureState.dx < -10) {
          this.isHorizontalSwipe = true;
          return true;
        }
        return false;
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
      onPanResponderRelease: (_, gestureState) => {
        this.isHorizontalSwipe = false;
        if (gestureState.dx > 120 && !this.isFirstItem()) {
          this.moveToPrevItem();
        } else if (gestureState.dx < -120 && !this.isLastItem()) {
          this.moveToNextItem();
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

  static getDerivedStateFromProps(props: Props): State {
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

  setDisableSwipe = (disable: boolean) => {
    this.disableSwipe = disable;
  };

  moveToNextItem = () => {
    Animated.timing(this.position, {
      toValue: { x: -SCREEN_WIDTH, y: 0 },
      useNativeDriver: true,
    }).start(() => {
      this.props.setCurrentItem(this.props.items[this.state.currentItemIndex + 1].id);
      this.position.setValue({ x: 0, y: 0 });
    });
  };

  moveToPrevItem = () => {
    Animated.timing(this.position, {
      toValue: { x: SCREEN_WIDTH, y: 0 },
      useNativeDriver: true,
    }).start(() => {
      this.props.setCurrentItem(this.props.items[this.state.currentItemIndex - 1].id);
      this.position.setValue({ x: 0, y: 0 });
    });
  };

  render() {
    const { items } = this.props;
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
        <Card key={items[currentItemIndex - 1]?.id} item={items[currentItemIndex - 1] || null} />
        <Card
          key={items[currentItemIndex].id}
          item={items[currentItemIndex]}
          setDisableSwipe={this.setDisableSwipe}
          moveToNextItem={this.moveToNextItem}
        />
        <Card key={items[currentItemIndex + 1]?.id} item={items[currentItemIndex + 1] || null} />
      </Animated.View>
    );
  }
}
