import { useEffect } from "react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { getItem, getItemAsync } from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

import { AppContextProvider } from "@/context/AppContext";

import { useAuthService } from "@/hooks/useService";
import { useStore } from "@/hooks/useStore";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });
    const store = useStore();
    const authToken = getItem("auth_t");
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
            <StatusBar style="light" />
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
