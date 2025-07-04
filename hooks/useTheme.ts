import { useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";

import { APP_THEME, AppTheme } from "@/util/theme";
import { getItem, setItemAsync } from "expo-secure-store";
import { SECURE_STORE_VARS } from "@/util/constants";

export type ColorScheme = "system" | "light" | "dark";

export const useTheme: () => {
    theme: AppTheme;
    colorScheme: ColorScheme;
    setColorScheme: React.Dispatch<React.SetStateAction<ColorScheme>>;
} = () => {
    const storedSettings = getItem(SECURE_STORE_VARS.colorScheme);
    const systemColorScheme = useColorScheme();
    const [userColorScheme, setUserColorScheme] = useState(
        systemColorScheme ?? "dark"
    );

    const [colorScheme, setColorScheme] = useState<ColorScheme>(
        (storedSettings as ColorScheme) ?? "system"
    );
    const theme = useMemo(() => APP_THEME[userColorScheme], [userColorScheme]);

    useEffect(() => {
        (async () => {
            await setItemAsync(SECURE_STORE_VARS.colorScheme, colorScheme);
        })();
    }, [colorScheme]);

    useEffect(() => {
        if (colorScheme === "system") {
            setUserColorScheme(systemColorScheme!);
        } else {
            setUserColorScheme(colorScheme);
        }
    }, [systemColorScheme, colorScheme]);

    return { theme, colorScheme, setColorScheme };
};
