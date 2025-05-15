import React, { useMemo, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
    createAnimatedPropAdapter,
    Easing,
    processColor,
    runOnJS,
    useAnimatedProps,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from "react-native-reanimated";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Circle } from "react-native-svg";

import { ScrollContainer } from "./ScrollContainer";

const REFRESH_CIRCLE_SIZE = 42;
const REFRESH_CIRCLE_BG_SIZE = REFRESH_CIRCLE_SIZE + 4;
const REFRESH_CIRCLE_INITIAL_OPACITY = 0;
const REFRESH_CIRCLE_INITIAL_DASHOFFSET = 251;
const REFRESH_CIRCLE_RESET_POSITION_DELAY = 200;

const styles = StyleSheet.create({
    container: { flex: 1 },
    circleBorder: {
        position: "absolute",
        left: Dimensions.get("window").width / 2 - REFRESH_CIRCLE_BG_SIZE / 2,
        zIndex: 999,
        backgroundColor: "#44cc44",
        width: REFRESH_CIRCLE_BG_SIZE,
        height: REFRESH_CIRCLE_BG_SIZE,
        borderRadius: REFRESH_CIRCLE_BG_SIZE,
    },
    refreshCircle: {
        position: "absolute",
        zIndex: 999,
        backgroundColor: "#242424",
        width: REFRESH_CIRCLE_BG_SIZE,
        height: REFRESH_CIRCLE_BG_SIZE,
        borderRadius: REFRESH_CIRCLE_BG_SIZE,
        left: Dimensions.get("window").width / 2 - REFRESH_CIRCLE_BG_SIZE / 2,
        alignItems: "center",
        justifyContent: "center",
    },
    svg: {
        zIndex: 999,
        transform: [{ rotate: "-90deg" }],
    },
});

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const RefreshableScrollContainer = ({ children, ...rest }: any) => {
    const insets = useSafeAreaInsets();
    const REFRESH_CIRCLE_INITIAL_POS = useMemo(
        () => insets.top + 12,
        [insets.top]
    );

    const [isPanEnabled, setIsPanEnabled] = useState(true);
    const refreshCirclePos = useSharedValue(REFRESH_CIRCLE_INITIAL_POS);
    const refreshCircleOpacity = useSharedValue(REFRESH_CIRCLE_INITIAL_OPACITY);
    const refreshCircleStroke = useSharedValue(
        REFRESH_CIRCLE_INITIAL_DASHOFFSET
    );

    const updatePanState = (offset: number) => {
        "worklet";
        if (offset >= 4) {
            runOnJS(setIsPanEnabled)(false);
        } else if (offset < 4) {
            runOnJS(setIsPanEnabled)(true);
        }
    };

    const scrollPanGesture = Gesture.Pan()
        .onUpdate(({ translationY }) => {
            if (translationY > 0) {
                const tYLog = Math.log2(translationY);
                const pos = tYLog * 12;
                const maxPos = 100;
                const percent = pos / maxPos;
                const clampPercent = percent > 1 ? 1 : percent;

                refreshCirclePos.value = pos;
                refreshCircleOpacity.value = clampPercent;
                refreshCircleStroke.value =
                    REFRESH_CIRCLE_INITIAL_DASHOFFSET -
                    REFRESH_CIRCLE_INITIAL_DASHOFFSET * clampPercent;
            }
        })
        .onFinalize(({ translationY }) => {
            const refreshCircleResetPosAnim = withTiming(
                REFRESH_CIRCLE_INITIAL_POS
            );
            const refreshCircleResetOpacityAnim = withTiming(
                REFRESH_CIRCLE_INITIAL_OPACITY
            );
            const refreshCircleResetStrokeAnim = withTiming(
                REFRESH_CIRCLE_INITIAL_DASHOFFSET
            );

            if (translationY >= REFRESH_CIRCLE_INITIAL_POS) {
                refreshCirclePos.value = withDelay(
                    REFRESH_CIRCLE_RESET_POSITION_DELAY,
                    refreshCircleResetPosAnim
                );
                refreshCircleOpacity.value = withDelay(
                    REFRESH_CIRCLE_RESET_POSITION_DELAY,
                    refreshCircleResetOpacityAnim
                );
                refreshCircleStroke.value = withDelay(
                    REFRESH_CIRCLE_RESET_POSITION_DELAY,
                    refreshCircleResetStrokeAnim
                );
            } else {
                refreshCirclePos.value = refreshCircleResetPosAnim;
                refreshCircleOpacity.value = refreshCircleResetOpacityAnim;
                refreshCircleStroke.value = refreshCircleResetStrokeAnim;
            }
        })
        .enabled(isPanEnabled);

    const onScroll = useAnimatedScrollHandler({
        onBeginDrag: ({ contentOffset }) => {
            updatePanState(contentOffset.y);
        },
        onEndDrag: ({ contentOffset }) => {
            updatePanState(contentOffset.y);
        },
        onMomentumEnd: ({ contentOffset }) => {
            updatePanState(contentOffset.y);
        },
    });

    const circleBorderAnimatedStyles = useAnimatedStyle(() => ({
        transform: [
            { translateY: refreshCirclePos.value },
            {
                scale: withTiming(refreshCircleOpacity.value === 1 ? 1.2 : 1, {
                    duration: 250,
                    easing: Easing.elastic(2),
                }),
            },
        ],
        opacity: refreshCircleOpacity.value === 1 ? 1 : 0,
    }));

    const refreshCircleAnimatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: refreshCirclePos.value }],
        opacity: refreshCircleOpacity.value,
    }));

    const adapter = createAnimatedPropAdapter(
        (props) => {
            if (Object.keys(props).includes("stroke")) {
                props.stroke = {
                    type: 0,
                    payload: processColor(props.stroke),
                };
            }
            if (Object.keys(props).includes("fill")) {
                props.fill = {
                    type: 0,
                    payload: processColor(props.fill),
                };
            }
        },
        ["fill", "stroke"]
    );

    const animatedProps = useAnimatedProps(
        () => ({
            cx: 50,
            cy: 50,
            r: 40,
            fill: "transparent",
            stroke: "#44cc44",
            strokeWidth: 8,
            strokeDasharray: "251,251",
            strokeDashoffset: refreshCircleStroke.value,
        }),
        [],
        adapter
    );

    const nativeGesture = Gesture.Native();
    const composedGestures = Gesture.Simultaneous(
        scrollPanGesture,
        nativeGesture
    );

    return (
        <GestureHandlerRootView>
            <View style={styles.container}>
                <Animated.View
                    style={[styles.circleBorder, circleBorderAnimatedStyles]}
                />
                <Animated.View
                    style={[styles.refreshCircle, refreshCircleAnimatedStyles]}
                >
                    <Svg
                        style={styles.svg}
                        width={REFRESH_CIRCLE_SIZE}
                        height={REFRESH_CIRCLE_SIZE}
                        viewBox="0 0 100 100"
                    >
                        <AnimatedCircle animatedProps={animatedProps} />
                    </Svg>
                </Animated.View>
                <GestureDetector gesture={composedGestures}>
                    <ScrollContainer
                        onScroll={onScroll}
                        overScrollMode="never"
                        bounces={false}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                        {...rest}
                    >
                        {children}
                    </ScrollContainer>
                </GestureDetector>
            </View>
        </GestureHandlerRootView>
    );
};
