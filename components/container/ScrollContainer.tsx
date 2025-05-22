import { StyleSheet } from "react-native";
import Animated, { AnimatedScrollViewProps } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PADDINGS } from "@/util/globalStyles";

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
                    paddingTop: insets.top + PADDINGS.lg,
                    paddingBottom: insets.bottom + PADDINGS.lg,
                    paddingLeft: 0,
                    paddingRight: 0,
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
