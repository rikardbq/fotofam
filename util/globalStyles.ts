import { StyleSheet } from "react-native";
import { FONT_NAMES } from "./constants";

type Sizes = {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    "2xl": number;
};

export const PADDINGS: Sizes = {
    sm: 4,
    md: 6,
    lg: 8,
    xl: 12,
    "2xl": 14,
};

export const FONT_SIZES: Sizes = {
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    "2xl": 22,
};

export default StyleSheet.create({
    font: {
        fontFamily: FONT_NAMES.RUBIK_LIGHT,
        fontSize: FONT_SIZES["md"],
    },
});
