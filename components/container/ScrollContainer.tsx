import { StyleSheet } from "react-native";
import Animated, { AnimatedScrollViewProps } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const styles = StyleSheet.create({
    scroll_container: {
        overflow: "hidden",
    },
});

type ScrollContainer = {
    children: React.ReactNode;
    style?: any;
    contentContainerStyle?: any;
};

export const ScrollContainer = ({
    children,
    style,
    contentContainerStyle,
    ...rest
}: AnimatedScrollViewProps) => {
    const insets = useSafeAreaInsets();

    return (
        <Animated.ScrollView
            {...rest}
            contentContainerStyle={[
                {
                    // backgroundColor: "#000", // for debug
                    paddingTop: insets.top + 6,
                    paddingBottom: insets.bottom + 6,
                    paddingLeft: insets.left + 6,
                    paddingRight: insets.right + 6,
                },
                styles.scroll_container,
                contentContainerStyle,
            ]}
            style={style}
        >
            {children}
        </Animated.ScrollView>
    );
};
