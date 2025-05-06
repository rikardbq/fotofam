import { useContext } from "react";
import { Redirect, Stack } from "expo-router";

import { AppContext } from "@/context/AppContext";

export default () => {
    const { store, authService } = useContext(AppContext);
    const authToken = authService.getAuthToken();
    const [state, _] = store;

    if (
        "user" in state &&
        !state.user.loggedIn &&
        authToken === null
    ) {
        return <Redirect href="/login" />;
    }

    return <Stack screenOptions={{ headerShown: false }} />;
};
