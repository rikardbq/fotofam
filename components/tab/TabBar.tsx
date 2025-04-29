import { SCREENS } from "@/util/constants";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import {
    Button,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Tab } from "./Tab";

const barHeight = Dimensions.get("window").height * 0.075;

const styles = StyleSheet.create({
    bar: {
        height: barHeight,
        maxHeight: barHeight,
        backgroundColor: "#000",
        padding: 6,
        flexDirection: "row",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        // borderLeftColor: "#fff",
        // borderLeftWidth: 1,
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
    },
    text: {
        color: "#fff",
    },
});

export const TabBar = ({
    state,
    descriptors,
    navigation,
}: BottomTabBarProps) => {
    console.log("STATE -> ", state);
    // console.log("DESCRIPTORS -> ", descriptors);

    return (
        <View style={styles.bar}>
            {state.routes
                .filter((x) => x.name !== "camera" && x.name !== "camera_roll")
                .map((route, index) => {
                    const { options } = descriptors[route.key];
                    const isFocused = state.index === index;

                    return (
                        <Tab
                            // title={options.title}
                            icon={options.tabBarIcon}
                            styles={{
                                button: styles.button,
                                text: styles.text,
                            }}
                            route={route}
                            navigation={navigation}
                            options={options}
                            isFocused={isFocused}
                            key={route.key}
                        />
                    );
                })}
        </View>
    );
};
