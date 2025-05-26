import { deleteItemAsync, setItemAsync } from "expo-secure-store";
import { decodeJwt } from "jose";

import * as api from "@/api";
import { Action, State, Store } from "@/reducer";
import { createAuthHeader, generateSignature, TokenClaims } from "@/util/auth";
import { SECURE_STORE_VARS } from "@/util/constants";
import { nowSeconds } from "@/util/time";

export type AuthRequest = {
    username: string;
    password: string;
};

export default class AuthService {
    private state: State;
    private dispatch: React.Dispatch<Action>;

    constructor([state, dispatch]: Store) {
        this.state = state;
        this.dispatch = dispatch;
    }

    async authenticate(username: string, password: string): Promise<string> {
        try {
            const {
                data: { token: at },
            } = await api.post("authenticate", {
                username,
                password: await generateSignature(username, password),
            });

            const {
                data: { token: rt },
            } = await api.post("authorize", undefined, createAuthHeader(at));

            return rt;
        } catch (error: any) {
            const response = error.response;
            const path = response.request.responseURL;
            const status = response.status;

            console.error(path);
            console.error(status);

            throw error;
        }
    }

    async login(rt: string): Promise<void> {
        try {
            const {
                data: { token },
            } = await api.post("login", undefined, createAuthHeader(rt));

            const decodedToken: TokenClaims = decodeJwt(token);
            this.dispatch({
                type: "LOGIN_USER",
                data: {
                    values: {
                        auth_t: token,
                        loggedIn: true,
                        username: decodedToken["x-uname"],
                        realName : decodedToken["x-rname"],
                    },
                },
            });

            await setItemAsync(SECURE_STORE_VARS.authToken, token);
            await setItemAsync(SECURE_STORE_VARS.lastLogin, nowSeconds().toString())
        } catch (error: any) {
            const response = error.response;
            const path = response.request.responseURL;
            const status = response.status;

            console.error(path);
            console.error(status);

            if (status === 401 || status === 403) {
                this.dispatch({
                    type: "LOGOUT_USER",
                });

                await deleteItemAsync(SECURE_STORE_VARS.authToken);
            }

            throw error;
        }
    }

    async logout(): Promise<void> {
        try {
            this.dispatch({
                type: "LOGOUT_USER",
            });

            await deleteItemAsync(SECURE_STORE_VARS.authToken);
            await api.post(`revoke/${this.state.user.username}`, undefined);
        } catch (error: any) {
            const response = error.response;
            const path = response.request.responseURL;
            const status = response.status;

            console.error(path);
            console.error(status);

            throw error;
        }
    }
}
