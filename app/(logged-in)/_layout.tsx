import { Redirect, Stack } from "expo-router";
import { useContext, useEffect } from "react";

import { AppContext } from "@/context/AppContext";
import { vacuumCache } from "@/util/cache";
import { useSQLiteContext } from "expo-sqlite";

export default () => {
    const { store } = useContext(AppContext);
    const db = useSQLiteContext();
    const state = store[0];

    // debug test bg colors etc
    // return null;

    useEffect(() => {
        return () => {
            vacuumCache(db);
        };
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
