import React, { useContext } from "react";
import { StyleSheet } from "react-native";

import { AppContext } from "@/context/AppContext";
import { HeadingText } from "../Heading";

export default ({ children, size }: HeadingText) => {
    const { theme } = useContext(AppContext);
    const styles = StyleSheet.create({
        text: {
            color: theme.colors.FG1,
        },
    });

    return (
        <HeadingText size={size} style={styles.text}>
            {children}
        </HeadingText>
    );
};
