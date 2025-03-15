import { useImageService } from "@/hooks/useService";
import { useStore } from "@/hooks/useStore";
import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import { Platform } from "react-native";

export default function TabLayout() {
    const store = useStore();
    const imageService = useImageService(store);

    // populate store with images for logged in user at this level
    // so i avoid multiple re-renders whenever tab switching happens
    useEffect(() => {
        (async () => await imageService.getAllImages())();

        return () => {
            // some cleanup
        };
    }, []);


    // possible to later implement a refresh hook whose state is
    // the current start-press / end-press delta in pixels > threshold = refresh
    // I may have to make this entire refresh-thing into a component with a event listener and local state
    // to manage whether the app needs to reload any store data.
    // i.e the call to imageService.getAllImages() could be called from the component based on the "shouldRefresh-value"
    // which in turn will repopulate our state if there's anything new to put into it.

    // some potential code
    /*
    const shouldRefresh = useDragToRefresh();
    useEffect(() => {
        if (shouldRefresh) (async () => await imageService.getAllImages())();
    }, [shouldRefresh]);
    */

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
