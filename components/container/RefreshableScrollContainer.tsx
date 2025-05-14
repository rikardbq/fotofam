import MCICONS from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useMemo, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
    runOnJS,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from "react-native-reanimated";

import { ScrollContainer } from "./ScrollContainer";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const REFRESH_CIRCLE_SIZE = 32;
const INITIAL_REFRESH_CIRCLE_OPACITY = 0;
const DELAY_RESET_POSITION = 200;

const styles = StyleSheet.create({
    container: { flex: 1 },
    refreshCircle: {
        position: "absolute",
        zIndex: 999,
        left: Dimensions.get("window").width / 2 - REFRESH_CIRCLE_SIZE / 2,
    },
});

export const RefreshableScrollContainer = ({ children, ...rest }: any) => {
    const insets = useSafeAreaInsets();
    const INITIAL_REFRESH_CIRCLE_POS = useMemo(() => insets.top + 12, [insets.top]);

    const [isPanEnabled, setIsPanEnabled] = useState(true);
    const refreshCirclePos = useSharedValue(INITIAL_REFRESH_CIRCLE_POS);
    const refreshCircleOpacity = useSharedValue(INITIAL_REFRESH_CIRCLE_OPACITY);

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
                const posLog = Math.log2(translationY) * 16;
                const maxPos = 100;

                refreshCircleOpacity.value = posLog / maxPos;
                refreshCirclePos.value = posLog;
            }
        })
        .onFinalize(({ translationY }) => {
            const refreshCircleResetPosAnim = withTiming(
                INITIAL_REFRESH_CIRCLE_POS
            );
            const refreshCircleResetOpacityAnim = withTiming(
                INITIAL_REFRESH_CIRCLE_OPACITY
            );

            if (translationY >= -INITIAL_REFRESH_CIRCLE_POS) {
                refreshCirclePos.value = withDelay(
                    DELAY_RESET_POSITION,
                    refreshCircleResetPosAnim
                );
                refreshCircleOpacity.value = withDelay(
                    DELAY_RESET_POSITION,
                    refreshCircleResetOpacityAnim
                );
            } else {
                refreshCirclePos.value = refreshCircleResetPosAnim;
                refreshCircleOpacity.value = refreshCircleResetOpacityAnim;
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

    const refreshCircleAnimatedStyles = useAnimatedStyle(() => ({
        transform: [
            { translateY: refreshCirclePos.value },
            { rotate: `${refreshCirclePos.value * 4}deg` },
        ],
        opacity: refreshCircleOpacity.value,
    }));

    const nativeGesture = Gesture.Native();
    const composedGestures = Gesture.Simultaneous(
        scrollPanGesture,
        nativeGesture
    );

    return (
        <GestureHandlerRootView>
            <View style={styles.container}>
                <Animated.View
                    style={[styles.refreshCircle, refreshCircleAnimatedStyles]}
                >
                    <MCICONS
                        name="refresh-circle"
                        size={REFRESH_CIRCLE_SIZE}
                        color="#ffffff"
                    />
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
