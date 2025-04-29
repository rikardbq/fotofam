import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
    base_container: {
        flex: 1,
        backgroundColor: "#000",
    },
});

type BaseContainer = {
    children: React.ReactNode;
    style?: any;
};

export const BaseContainer = ({ children, style }: any) => {
    return (
        <View style={{ ...styles.base_container, ...style }}>{children}</View>
    );
};
