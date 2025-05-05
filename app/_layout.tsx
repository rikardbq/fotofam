import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { AppContextProvider } from "@/context/AppContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });

    // basically check the secureStorage for "auth_t" token. if found, try login with it
    // server responds with new token if in need of refresh
    useEffect(() => {}, []);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }


    // figure out what the structure should be here
    return (
        <AppContextProvider>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                    name="(screens)/camera"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="(screens)/component_test"
                    options={{ headerShown: false }}
                />
            </Stack>
            <StatusBar style="light" />
        </AppContextProvider>
    );
}
