import { Tabs } from "expo-router";
import React, { useState } from "react";
import { Platform } from "react-native";

export default function TabLayout() {
    const [photoPath, setPhotoPath] = useState("");
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#e3e3e3",
                headerShown: false,
                tabBarStyle: Platform.select({
                    ios: {
                        // Use a transparent background on iOS to show the blur effect
                        position: "absolute",
                    },
                    default: {},
                }),
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                }}
            />
            <Tabs.Screen
                name="camera"
                options={{
                    title: "Camera",
                }}
            />
        </Tabs>
    );
}
