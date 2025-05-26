import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { getItem } from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { SQLiteProvider } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import { Suspense, useEffect, useLayoutEffect } from "react";

import {
    AppContextConsumer,
    AppContextDefaultState,
    AppContextProvider,
} from "@/context/AppContext";

import { useAuthService } from "@/hooks/useService";
import { useStore } from "@/hooks/useStore";
import { ColorSchemes } from "@/hooks/useTheme";
import { initCache } from "@/util/cache";
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
    const [state, dispatch] = store;
    const authService = useAuthService(store);

    useLayoutEffect(() => {
        dispatch({
            type: "SET_TOKEN",
            data: {
                values: {
                    auth_t: getItem(SECURE_STORE_VARS.authToken),
                },
            },
        });
    }, []);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();

            if (!state.user.loggedIn && !!state.user.auth_t) {
                authService.login(state.user.auth_t);
            }
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <Suspense fallback={null}>
            <SQLiteProvider
                databaseName="cache.db"
                onInit={initCache}
                useSuspense
            >
                <AppContextProvider store={store} authService={authService}>
                    <AppContextConsumer>
                        {({ colorScheme, theme }: AppContextDefaultState) => (
                            <>
                                <Stack
                                    screenOptions={{
                                        animation: "none",
                                        headerShown: false,
                                        contentStyle: {
                                            backgroundColor: theme.colors.BG0,
                                        },
                                    }}
                                />
                                <StatusBar
                                    style={getStatusBarStyle(colorScheme)}
                                />
                            </>
                        )}
                    </AppContextConsumer>
                </AppContextProvider>
            </SQLiteProvider>
        </Suspense>
    );
}
