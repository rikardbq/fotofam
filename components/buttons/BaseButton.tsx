import {
    GestureResponderEvent,
    StyleSheet,
    Text,
    TouchableHighlight,
} from "react-native";

type LocalizedButton = {
    children?: React.ReactNode;
    label?: string;
    onPress?: (e: GestureResponderEvent) => void;
    underlayColor?: string;
    activeOpacity?: number;
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#4499ff",
        borderRadius: 6,
        padding: 12,
        maxHeight: 60,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 18,
        fontStyle: "normal",
        fontWeight: 600,
        color: "#fff",
    },
});

export default ({
    label,
    onPress,
    underlayColor = "#4477ff",
    activeOpacity = 1,
    children,
}: LocalizedButton) => {
    return (
        <TouchableHighlight
            onPress={onPress}
            activeOpacity={activeOpacity}
            underlayColor={underlayColor}
            style={styles.container}
        >
            {label ? <Text style={styles.text}>{label}</Text> : children}
        </TouchableHighlight>
    );
};
