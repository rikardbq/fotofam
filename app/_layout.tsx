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

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <AppContextProvider>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="(screens)/camera" options={{ headerShown: false }} />
                <Stack.Screen name="(screens)/component_test" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="light" />
        </AppContextProvider>
    );
}
