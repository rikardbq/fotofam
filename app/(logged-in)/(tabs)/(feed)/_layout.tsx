import { Stack } from "expo-router";

export const unstable_settings = {
    initialRouteName: "index",
};

export default () => {
    return <Stack screenOptions={{ animation: "none", headerShown: false }} />;
};
