# 滑动组件

```tsx
import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  Animated,
  StyleProp,
  TextStyle,
  DimensionValue,
  PanResponderInstance,
} from 'react-native';

export interface VerticalSliderProps {
  width?: number;
  height?: number;
  minValue?: number;
  maxValue?: number;
  bottomText?: string;
  value: number;
  step?: number;
  showText?: boolean;
  onChange?: (value: number) => void;
  textStyle?: StyleProp<TextStyle>;
  foregroundColor?: string;
  backgroundColor?: string;
  radius?: number;
  textBottom?: DimensionValue;
  disabled?: boolean;
}

export const VerticalSlider: React.FC<VerticalSliderProps> = ({
  width = 50,
  height = 150,
  minValue = 0,
  maxValue = 100,
  bottomText = '',
  value,
  step = 1,
  showText = true,
  onChange = () => {},
  textStyle,
  foregroundColor = '#000000',
  backgroundColor = '#e0e0e0',
  radius = 10,
  textBottom = '8%',
  disabled = false,
}) => {
  const pan = useRef(new Animated.Value(0)).current;
  const isDrag = useRef(false);
  const lastValue = useRef(value);
  const panResponder = useRef<PanResponderInstance>();

  const calculateValue = (y: number, stepHeight: number) => {
    const stepDiff = Math.round(y / stepHeight);
    return Math.max(minValue, Math.min(maxValue, lastValue.current - stepDiff * step));
  };

  useEffect(() => {
    const stepHeight = height / ((maxValue - minValue) / step);

    panResponder.current = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dy: pan }], { useNativeDriver: false }),
      onPanResponderStart: () => {
        isDrag.current = true;
      },
      onPanResponderEnd: (e, gestureState) => {
        isDrag.current = false;
        if (disabled) return;
        lastValue.current = calculateValue(gestureState.dy, stepHeight);
      },
    });

    pan.addListener((val) => {
      if (disabled) return;
      onChange(calculateValue(val.value, stepHeight));
    });

    if (value < minValue) {
      onChange(minValue);
    } else if (value > maxValue) {
      onChange(maxValue);
    }

    return () => {
      pan.removeAllListeners();
    };
  }, [height, maxValue, minValue, step]);

  useEffect(() => {
    if (isDrag.current) return;
    lastValue.current = value;
  }, [value]);

  const partHeight = (value / maxValue) * height;

  return (
    <View
      style={[styles.container, { width, height, backgroundColor, borderRadius: radius }]}
      {...panResponder.current?.panHandlers}
    >
      <Animated.View
        style={[styles.part, { height: partHeight, width, backgroundColor: foregroundColor }]}
      />
      {showText && (
        <View style={[styles.textBox, { bottom: textBottom }]}>
          <Text style={[styles.text, textStyle]}>
            {value <= minValue && bottomText ? bottomText : Math.floor(value)}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column-reverse',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'lightgray',
  },
  part: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBox: {
    position: 'absolute',
    bottom: '8%',
    left: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});
```
