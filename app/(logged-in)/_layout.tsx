import { useContext } from "react";
import { Redirect, Stack } from "expo-router";

import { AppContext } from "@/context/AppContext";

export default () => {
    const { useStore, useAuthService, useAuthToken } = useContext(AppContext);
    const authToken = useAuthToken();
    const [state, _] = useStore();

    if (!state.user.loggedIn && authToken === null) {
        return <Redirect href="/login" />;
    }

    return <Stack screenOptions={{ headerShown: false }} />;
};
