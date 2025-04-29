import {
    BottomTabNavigationEventMap,
    BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";
import {
    NavigationHelpers,
    NavigationRoute,
    ParamListBase,
} from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

type TabStyles = {
    button: {
        // borderLeftColor: string;
        // borderLeftWidth: number;
        flex: number;
        flexDirection: "row";
        justifyContent: "center";
    };
    text: {
        color: string;
    };
};

type TabProps = {
    title?: string;
    icon?: (props: any) => React.ReactNode;
    styles: TabStyles;
    route: NavigationRoute<ParamListBase, string>;
    navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
    options: BottomTabNavigationOptions;
    isFocused: boolean;
};

export const Tab = ({
    title,
    icon,
    styles,
    route,
    navigation,
    options,
    isFocused,
}: TabProps) => {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={() => {
                const event = navigation.emit({
                    type: "tabPress",
                    target: route.key,
                    canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                    navigation.navigate(route.name, route.params);
                }
            }}
        >
            {title && <Text style={styles.text}>{title}</Text>}
            {icon &&
                icon({
                    focused: isFocused,
                    color: isFocused
                        ? options.tabBarActiveTintColor!
                        : "#bbb",
                    size: 24,
                })}
        </TouchableOpacity>
    );
};
