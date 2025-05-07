import { TabBar } from "@/components/tab/TabBar";
import FA5ICONS from "@expo/vector-icons/FontAwesome5";
import IONICONS from "@expo/vector-icons/Ionicons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import React from "react";
import { Image, Platform, StyleSheet } from "react-native";

export default () => {
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
    const st = StyleSheet.create({
        bar: {
            backgroundColor: "#000",
            borderColor: "#fff",
        },
        inner: {
            color: "#fff",
        },
    });

    return (
        <Tabs
            tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}
            backBehavior="firstRoute"
            screenOptions={{
                tabBarActiveTintColor: "#fff",
                tabBarActiveBackgroundColor: "#000",
                tabBarInactiveBackgroundColor: "#000",
                headerShown: false,
                tabBarStyle: Platform.select({
                    ios: {
                        // Use a transparent background on iOS to show the blur effect
                        // position: "absolute",
                        position: "absolute",
                    },
                    default: {
                        border: 0,
                        borderColor: "#000",
                    },
                }),
            }}
        >
            <Tabs.Screen
                name="(feed)"
                options={{
                    title: "Feed",
                    tabBarIcon: ({ color }) => (
                        <IONICONS name="albums" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="(add_post)"
                options={{
                    title: "Add post",
                    tabBarIcon: ({ color }) => (
                        <FA5ICONS name="plus-square" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="(personal)"
                options={{
                    title: "Personal",
                    tabBarIcon: ({ color }) => (
                        <Test />
                        // <FA5ICONS
                        //     name="user-alt"
                        //     size={24}
                        //     color={color}
                        // />
                    ),
                }}
            />
        </Tabs>
    );
}

// some test just to see what a personal icon for the users space would look like
const Test = ({ focused, color, size }: any) => (
    <Image
        source={require("../../../123.jpg")}
        style={{ width: 24, height: 24, borderRadius: 12 }}
    />
);
