# 滑动组件

```tsx
import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, PanResponder, Animated, StyleProp, TextStyle } from 'react-native';

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
    onChange,
    textStyle,
    foregroundColor = '#000000',
    backgroundColor = '#e0e0e0',
    radius = 10,
}) => {
    const pan = useRef(new Animated.Value(0)).current;
    const lastValue = useRef(value);

    const stepHeight = height / ((maxValue - minValue) / step);

    useEffect(() => {
        pan.addListener((val) => {
            const stepDiff = Math.round(val.value / stepHeight);
            onChange && onChange(Math.max(minValue, Math.min(maxValue, lastValue.current - stepDiff * step)));
        });

        return () => {
            pan.removeAllListeners();
        };
    }, [height, maxValue, minValue, step, pan, stepHeight, onChange]);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([null, { dy: pan }], { useNativeDriver: false }),
            onPanResponderRelease: (e, gestureState) => {
                const stepDiff = Math.round(gestureState.dy / stepHeight);
                lastValue.current = Math.max(minValue, Math.min(maxValue, lastValue.current - stepDiff * step));
                pan.setValue(0);
            },
        })
    ).current;

    useEffect(() => {
        lastValue.current = value;
    }, []);

    const partHeight = (value / maxValue) * height;

    return (
        <View
            style={[styles.container, { width, height, backgroundColor, borderRadius: radius }]}
            {...panResponder.panHandlers}
        >
            <Animated.View style={[styles.part, { height: partHeight, width, backgroundColor: foregroundColor }]} />
            {showText && (
                <View style={styles.textBox}>
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
