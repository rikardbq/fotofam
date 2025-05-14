import { useEffect } from "react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { getItem } from "expo-secure-store";

import {
    AppContextConsumer,
    AppContextDefaultState,
    AppContextProvider,
} from "@/context/AppContext";

import { useAuthService } from "@/hooks/useService";
import { useStore } from "@/hooks/useStore";
import { ColorSchemes } from "@/hooks/useTheme";
import { FONT_NAMES, SECURE_STORE_VARS } from "@/util/constants";

SplashScreen.preventAutoHideAsync();

const getStatusBarStyle = (scheme: ColorSchemes) => {
    switch (scheme) {
        case "dark":
            return "light";
        case "light":
            return "dark";
        default:
            return "auto";
    }
};

export default function RootLayout() {
    const [loaded, _] = useFonts({
        [FONT_NAMES.RUBIK_LIGHT]: require("../assets/fonts/Rubik-Light.ttf"),
        [FONT_NAMES.RUBIK_REGULAR]: require("../assets/fonts/Rubik-Regular.ttf"),
        [FONT_NAMES.RUBIK_MEDIUM]: require("../assets/fonts/Rubik-Medium.ttf"),
        [FONT_NAMES.RUBIK_BOLD]: require("../assets/fonts/Rubik-Bold.ttf"),
        [FONT_NAMES.RUBIK_LIGHT_ITALIC]: require("../assets/fonts/Rubik-LightItalic.ttf"),
        [FONT_NAMES.RUBIK_REGULAR_ITALIC]: require("../assets/fonts/Rubik-RegularItalic.ttf"),
        [FONT_NAMES.RUBIK_MEDIUM_ITALIC]: require("../assets/fonts/Rubik-MediumItalic.ttf"),
        [FONT_NAMES.RUBIK_BOLD_ITALIC]: require("../assets/fonts/Rubik-BoldItalic.ttf"),
    });
    const store = useStore();
    const authToken = getItem(SECURE_STORE_VARS.authToken);
    const authService = useAuthService(store, authToken);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();

            (async () => {
                if (authToken !== null) {
                    await authService.login(authToken);
                }
            })();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <AppContextProvider store={store} authService={authService}>
            <Stack screenOptions={{ headerShown: false }} />
            <AppContextConsumer>
                {({ colorScheme }: AppContextDefaultState) => (
                    <StatusBar style={getStatusBarStyle(colorScheme)} />
                )}
            </AppContextConsumer>
        </AppContextProvider>
    );

    // return (
    //     <AppContextProvider store={store} authService={authService}>
    //         <Stack
    //             initialRouteName="(screens)/login"
    //             // {
    //             //     !state || !state.user || !state.user.loggedIn
    //             //         ? "(screens)/login"
    //             //         : "(tabs)"
    //             // }
    //         >
    //             <Stack.Screen
    //                 name="(screens)/login"
    //                 options={{ headerShown: false }}
    //             />
    //             {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
    //             <Stack.Screen
    //                 name="(screens)/camera"
    //                 options={{ headerShown: false }}
    //             />
    //             <Stack.Screen
    //                 name="(screens)/component_test"
    //                 options={{ headerShown: false }}
    //             />
    //         </Stack>
    //         <StatusBar style="light" />
    //     </AppContextProvider>
    // );
}
