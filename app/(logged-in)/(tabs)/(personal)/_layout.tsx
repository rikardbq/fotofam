import { Stack } from "expo-router";

// export const unstable_settings = {
//     initialRouteName: "(feed)/index",
// };

export default () => {
    return <Stack screenOptions={{ headerShown: false }} />;
};
