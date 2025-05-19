import React, { useContext, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";

import { AppContext } from "@/context/AppContext";
import LocalizedButton from "@/components/buttons/i18n/LocalizedButton";
import { BaseContainer } from "@/components/container/BaseContainer";
import { ScrollContainer } from "@/components/container/ScrollContainer";
import globalStyles from "@/util/globalStyles";

export default () => {
    const router = useRouter();
    const { authService, theme } = useContext(AppContext);
    const [st, setSt] = useState(false);

    const [username, onChangeUsername] = useState<string | undefined>(
        undefined
    );
    const [password, onChangePassword] = useState<string | undefined>(
        undefined
    );

    return (
        <BaseContainer>
            <ScrollContainer>
                <View style={styles.loginBox}>
                    {st && (
                        <Text
                            style={{
                                ...globalStyles.font,
                                fontWeight: 800,
                                color: theme.colors.BRIGHT_RED,
                            }}
                        >
                            ERR
                        </Text>
                    )}
                    <Text
                        style={{
                            ...globalStyles.font,
                            fontWeight: 800,
                            color: theme.colors.FG1,
                        }}
                    >
                        LOGGA IN
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeUsername}
                        value={username}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangePassword}
                        value={password}
                    />
                    <LocalizedButton
                        label="label.login"
                        disabled={
                            username === undefined || password === undefined
                        }
                        onPress={async () => {
                            try {
                                const rt = await authService.authenticate(
                                    username!,
                                    password!
                                );

                                await authService.login(rt);
                                router.replace("/(logged-in)" as any);
                            } catch (error: any) {
                                console.log("rethrew err ", error.response);
                                setSt(true);
                            }
                        }}
                    />
                </View>
            </ScrollContainer>
        </BaseContainer>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        width: "100%",
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "#fff",
        color: "#242424",
    },
    loginBox: {
        flex: 1,
        backgroundColor: "#242424",
        borderRadius: 12,
        padding: 8,
        alignItems: "center",
    },
});
