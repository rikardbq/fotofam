import LocalizedButton from "@/components/buttons/i18n/LocalizedButton";
import { BaseContainer } from "@/components/container/BaseContainer";
import { ScrollContainer } from "@/components/container/ScrollContainer";
import BouncingDots from "@/components/loading/BouncingDots";
import {Spinner} from "@/components/loading";
import { AppContext } from "@/context/AppContext";
import { useNavigation } from "@/hooks/useNavigation";
import { encodePassword } from "@/util/auth";
import axios from "axios";
import { getItemAsync, setItemAsync } from "expo-secure-store";
import React, { useContext, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default () => {
    const [username, onChangeUsername] = useState("");
    const [password, onChangePassword] = useState("");
    const [at, setAt] = useState("");
    const [rt, setRt] = useState("");
    const { authService } = useContext(AppContext);
    const navigation = useNavigation();
    const someRandomAppID = "FFFE"; // this will live in some JSON or other file where it can be imported from, generated once and kept safe to maintain token validity for all tokens issued for this app, backend checks against registered client apps

    const handleLoginFlow = async (username: string, password: string) => {
        const rt = await authService.authenticate(username, password);
        const resp = await authService.login(rt);
        console.log(resp);
    };

    const authenticate = (data: any) => {
        axios
            .post("http://192.168.0.22:8082/authenticate", data, {
                headers: {
                    "X-API-KEY": "api_123_key",
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            })
            .then(({ data }) => {
                console.log(data);
                setAt(data.token);
            })
            .catch(({ response }) => {
                console.log(response.status);
            });
    };

    const authorize = () => {
        axios
            .post("http://192.168.0.22:8082/authorize", undefined, {
                headers: {
                    Authorization: `Bearer ${at}`,
                    "x-api-key": "api_123_key",
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            })
            .then(({ data }) => {
                console.log(data);
                setRt(data.token);
            })
            .catch(({ response }) => {
                console.log(response.status);
            });
    };

    const login = () => {
        axios
            .post("http://192.168.0.22:8082/login", undefined, {
                headers: {
                    Authorization: `Bearer ${rt}`,
                    "x-api-key": "api_123_key",
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            })
            .then(({ data }) => {
                setItemAsync("rikardbq", data.token).then(() => {
                    getItemAsync("rikardbq").then((a) => {
                        console.log("from secure storage ", a);
                    });
                });
            })
            .catch(({ response }) => {
                console.log(response.status);
            });
        // set application state with useStore, i.e action = LOGIN, set all app state related to user data and set the token as part of app state so the token is available and doesnt have to be re-read from storage all the time
    };

    return (
        <BaseContainer>
            <ScrollContainer>
                <View style={styles.innerView}>
                    <Text style={styles.text}>LOADING THINGYS</Text>
                    <Spinner />
                    <BouncingDots />

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
                        label="label.authenticate"
                        onPress={() => {
                            authenticate({
                                applicationId: someRandomAppID,
                                username,
                                password: encodePassword(password),
                            });
                        }}
                    />
                    <LocalizedButton
                        label="label.authorize"
                        onPress={() => authorize()}
                    />
                    <LocalizedButton
                        label="label.login"
                        onPress={() => login()}
                    />
                    <LocalizedButton
                        label="Handle login flow"
                        onPress={() => {
                            // login();
                            handleLoginFlow(username, encodePassword(password));
                        }}
                    />
                    <LocalizedButton
                        label="Logout"
                        onPress={() => {
                            authService.logout();
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
    },
    innerView: {
        flex: 1,
        backgroundColor: "#fff",
    },
    text: { color: "#000" },
    container: {
        flex: 1,
        paddingTop: 60,
        flexDirection: "column",
        gap: 8,

        // justifyContent: "center",
        alignItems: "center",
        height: 20,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#000",
    },
});
