import React, { useContext, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useRouter } from "expo-router";

import { AppContext } from "@/context/AppContext";
import { encodePassword } from "@/util/auth";

import LocalizedButton from "@/components/buttons/i18n/LocalizedButton";
import { BaseContainer } from "@/components/container/BaseContainer";
import { ScrollContainer } from "@/components/container/ScrollContainer";

export default () => {
    const router = useRouter();
    const { authService } = useContext(AppContext);

    const [username, onChangeUsername] = useState<string | undefined>(
        undefined
    );
    const [password, onChangePassword] = useState<string | undefined>(
        undefined
    );

    /**
     * else {
                const rt = await authService.authenticate({
                    username: "rikardbq",
                    password: encodePassword("rikard123"),
                });

                const responseToken = await authService.login(rt);
                await setItemAsync("auth_t", responseToken);
            }
     */
    return (
        <BaseContainer>
            <ScrollContainer>
                <View style={styles.loginBox}>
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
                        onPress={() => {
                            authService
                                .authenticate({
                                    username: username!,
                                    password: encodePassword(password!),
                                })
                                .then((rt) => {
                                    authService.login(rt).then(() => {
                                        router.replace("/(logged-in)" as any);
                                    });
                                });
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
    },
});
