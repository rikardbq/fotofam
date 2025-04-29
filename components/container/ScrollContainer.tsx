import {
    LayoutChangeEvent,
    NativeScrollEvent,
    NativeSyntheticEvent,
    StyleSheet,
} from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const styles = StyleSheet.create({
    scroll_container: {
        overflow: "hidden",
    },
});

type ScrollContainer = {
    children: React.ReactNode;
    onLayout?: (event: LayoutChangeEvent) => void;
    onContentSizeChange?: (w: number, h: number) => void;
    onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    onScrollEndDrag?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    scrollEventThrottle?: number;
    style?: any;
};

export const ScrollContainer = ({
    children,
    onLayout,
    onContentSizeChange,
    onScroll,
    onScrollEndDrag,
    scrollEventThrottle,
    style,
}: ScrollContainer) => {
    const insets = useSafeAreaInsets();

    return (
        <Animated.ScrollView
            onLayout={onLayout}
            onContentSizeChange={onContentSizeChange}
            onScroll={onScroll}
            onScrollEndDrag={onScrollEndDrag}
            scrollEventThrottle={scrollEventThrottle}
            contentContainerStyle={{
                // backgroundColor: "#000", // for debug
                paddingTop: insets.top + 6,
                paddingBottom: insets.bottom + 6,
                paddingLeft: insets.left + 6,
                paddingRight: insets.right + 6,
                ...styles.scroll_container,
                ...style,
            }}
        >
            {children}
        </Animated.ScrollView>
    );
};
