import { Redirect, Stack } from "expo-router";
import { useContext, useEffect } from "react";

import { AppContext } from "@/context/AppContext";
import { resetCache } from "@/util/cache";
import { SECURE_STORE_VARS } from "@/util/constants";
import { daySeconds, nowSeconds } from "@/util/time";
import { getItemAsync } from "expo-secure-store";

export default () => {
    const { store, cache } = useContext(AppContext);
    const state = store[0];

    // debug test bg colors etc
    // return null;

    useEffect(() => {
        (async () => {
            const lastLogin =
                (await getItemAsync(SECURE_STORE_VARS.lastLogin)) ?? "0";
            if (nowSeconds() - parseInt(lastLogin) > daySeconds() / 4) {
                await resetCache(cache);
            }
        })();
    }, []);

    if ("user" in state && !state.user.loggedIn) {
        return !state.user.auth_t ? <Redirect href="/login" /> : null;
    }

    return (
        <Stack
            screenOptions={{
                animation: "none",
                headerShown: false,
            }}
        />
    );
};
