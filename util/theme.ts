import { StyleSheet } from "react-native";

const THEME_COLORS = {
    dark: {
        BG0: "#000000",
        BG1: "#242424",
        FG0: "#ffffff",
        FG1: "#dddddd",
        BLACK: "#000000",
        RED: "#bb0000",
        GREEN: "#00bb00",
        YELLOW: "#dddd00",
        BLUE: "#4444dd",
        MAGENTA: "#cc44cc",
        CYAN: "#00dddd",
        WHITE: "#ffffff",
        BRIGHT_BLACK: "#424242",
        BRIGHT_RED: "#ff6666",
        BRIGHT_GREEN: "#44ff44",
        BRIGHT_YELLOW: "#eeee44",
        BRIGHT_BLUE: "#5555ff",
        BRIGHT_MAGENTA: "#ee66ee",
        BRIGHT_CYAN: "#44eeee",
        BRIGHT_WHITE: "#ffffff",
    },
    light: {
        BG0: "#000000",
        BG1: "#242424",
        FG0: "#ffffff",
        FG1: "#dddddd",
        BLACK: "#000000",
        RED: "#bb0000",
        GREEN: "#00bb00",
        YELLOW: "#dddd00",
        BLUE: "#4444dd",
        MAGENTA: "#cc44cc",
        CYAN: "#00dddd",
        WHITE: "#ffffff",
        BRIGHT_BLACK: "#424242",
        BRIGHT_RED: "#ff6666",
        BRIGHT_GREEN: "#44ff44",
        BRIGHT_YELLOW: "##eeee44",
        BRIGHT_BLUE: "#5555ff",
        BRIGHT_MAGENTA: "#ee66ee",
        BRIGHT_CYAN: "#44eeee",
        BRIGHT_WHITE: "#ffffff",
    },
};

const THEME_STYLES = {
    dark: StyleSheet.create({}),
    light: StyleSheet.create({}),
};

export const APP_THEME = {
    dark: {
        colors: THEME_COLORS["dark"],
        styles: THEME_STYLES["dark"],
    },
    light: {
        colors: THEME_COLORS["light"],
        styles: THEME_STYLES["light"],
    },
};

export type AppTheme = typeof APP_THEME.dark;
