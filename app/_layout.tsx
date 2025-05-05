import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { AppContextProvider } from "@/context/AppContext";
import { useStore } from "@/hooks/useStore";
import { useAuthService } from "@/hooks/useService";
import { getItemAsync, setItemAsync } from "expo-secure-store";
import { encodePassword, TokenClaims } from "@/util/auth";
import { decodeJwt } from "jose";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });
    const store = useStore();
    const [state, dispatch] = store;
    const authService = useAuthService(store);

    // basically check the secureStorage for "auth_t" token. if found, try login with it
    // server responds with new token if in need of refresh
    useEffect(() => {
        (async () => {
            const auth_t = await getItemAsync("auth_t");
            console.log(auth_t);

            if (auth_t !== null) {
                // run login with auth_t token
                const responseToken = await authService.login(auth_t);
                await setItemAsync("auth_t", responseToken);

                const decodedToken: TokenClaims = decodeJwt(responseToken);
                dispatch({
                    type: "LOGIN_USER",
                    data: {
                        value: {
                            auth_t: responseToken,
                            username: decodedToken["x-uname"],
                        },
                    },
                });

                console.log("HAVE DONE THE LOGIN");
            } 
            // this is for testing, the else clause should be a function call inside the login screen that dispatches state change through the store
            else {
                const rt = await authService.authenticate({
                    applicationId: "FFFE",
                    username: "rikardbq",
                    password: encodePassword("rikard123"),
                });

                const responseToken = await authService.login(rt);
                await setItemAsync("auth_t", responseToken);
                
            }
        })();
    }, []);

    useEffect(() => {
        console.log(state.user);
    }, [state.user]);

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
        <AppContextProvider store={store} authService={authService}>
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
