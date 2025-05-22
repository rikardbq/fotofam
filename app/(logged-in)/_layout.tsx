import { useContext } from "react";
import { Redirect, Stack } from "expo-router";

import { AppContext } from "@/context/AppContext";

export default () => {
    const { store } = useContext(AppContext);
    const state = store[0];

    // debug test bg colors etc
    // return null;

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
