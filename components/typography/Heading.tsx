import { StyleProp, Text, TextStyle } from "react-native";
import globalStyles, { FONT_SIZES } from "@/util/globalStyles";
import { FONT_NAMES } from "@/util/constants";

export type HeadingBase = {
    children: React.ReactNode;
    style?: StyleProp<TextStyle>;
};

export type HeadingText = {
    size: keyof typeof FONT_SIZES;
} & HeadingBase;

export const HeadingText = ({ size = "sm", children, style }: HeadingText) => {
    return (
        <Text
            style={[
                globalStyles.font,
                { fontSize: FONT_SIZES[size], fontFamily: FONT_NAMES.RUBIK_MEDIUM },
                style,
            ]}
        >
            {children}
        </Text>
    );
};

// export const Heading: Record<
//     string,
//     React.JSXElementConstructor<HeadingBase>
// > = {
//     sm: ({ children, ...rest }: HeadingBase) => {
//         return (
//             <HeadingText size="md" {...rest}>
//                 {children}
//             </HeadingText>
//         );
//     },
//     md: ({ children, ...rest }: HeadingBase) => {
//         return (
//             <HeadingText size="lg" {...rest}>
//                 {children}
//             </HeadingText>
//         );
//     },
//     lg: ({ children, ...rest }: HeadingBase) => {
//         return (
//             <HeadingText size="xl" {...rest}>
//                 {children}
//             </HeadingText>
//         );
//     },
//     xl: ({ children, ...rest }: HeadingBase) => {
//         return (
//             <HeadingText size="2xl" {...rest}>
//                 {children}
//             </HeadingText>
//         );
//     },
// };
