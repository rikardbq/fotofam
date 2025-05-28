import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    spinner: {
        width: 40,
        height: 40,
        borderWidth: 4,
        borderTopWidth: 10,
        borderRadius: 20,
        borderColor: "#000000", // visible rotating part
        backgroundColor: "#ffffff",
        alignItems: "center",
        overflow: "hidden",
    },
});

export const Spinner = () => {
    const rotateAnim = useRef(new Animated.Value(0)).current;
    // const thicknessAnim = useRef(new Animated.Value(6)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(rotateAnim, {
                    toValue: 0.5,
                    duration: 750,
                    easing: Easing.elastic(1.25),
                    useNativeDriver: true,
                }),
                Animated.timing(rotateAnim, {
                    toValue: 1,
                    easing: Easing.elastic(1.25),
                    duration: 750,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // makes this a little more jiggly
        // Animated.loop(
        //     Animated.sequence([
        //         Animated.timing(thicknessAnim, {
        //             toValue: 10,
        //             duration: 375,
        //             useNativeDriver: true,
        //           }),
        //           Animated.timing(thicknessAnim, {
        //             toValue: 4,
        //             duration: 375,
        //             useNativeDriver: true,
        //           }),
        //           Animated.timing(thicknessAnim, {
        //             toValue: 10,
        //             duration: 375,
        //             useNativeDriver: true,
        //           }),
        //           Animated.timing(thicknessAnim, {
        //             toValue: 4,
        //             duration: 375,
        //             useNativeDriver: true,
        //           })
        //     ])
        // ).start();
    }, [
        rotateAnim,
        // thicknessAnim
    ]);

    const spin = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    return (
        <Animated.View
            style={[
                styles.spinner,
                {
                    transform: [{ rotate: spin }],
                    // borderTopWidth: thicknessAnim,
                },
            ]}
        />
    );
};
