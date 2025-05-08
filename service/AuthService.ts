import { deleteItemAsync, setItemAsync } from "expo-secure-store";
import { decodeJwt } from "jose";

import * as api from "@/api";
import { appID } from "@/fotofamExtra.json";
import { getAuthHeader, TokenClaims } from "@/util/auth";
import { SECURE_STORE_VARS } from "@/util/constants";

export type AuthRequest = {
    username: string;
    password: string;
};

export default class AuthService {
    private dispatch: any;
    private authToken: string | null = null;
    private baseUrl: string = "http://192.168.0.22:8082"; // use env var in real scenario. start using dotenv files

    constructor([_, dispatch]: any, authToken: string | null) {
        this.dispatch = dispatch;
        this.authToken = authToken;
    }

    getAuthToken() {
        return this.authToken;
    }

    async authenticate(body: AuthRequest) {
        const {
            data: { token: at },
        } = await api.post(`${this.baseUrl}/authenticate`, {
            ...body,
            applicationId: appID,
        });

        const {
            data: { token: rt },
        } = await api.post(
            `${this.baseUrl}/authorize`,
            undefined,
            getAuthHeader(at)
        );

        return rt;
    }

    async login(rt: string) {
        try {
            const {
                data: { token },
            } = await api.post(
                `${this.baseUrl}/login`,
                undefined,
                getAuthHeader(rt)
            );

            const decodedToken: TokenClaims = decodeJwt(token);
            this.dispatch({
                type: "LOGIN_USER",
                data: {
                    values: {
                        auth_t: token,
                        loggedIn: true,
                        username: decodedToken["x-uname"],
                    },
                },
            });

            await setItemAsync(SECURE_STORE_VARS.authToken, token);
        } catch (error: any) {
            // console.log(error.response.config.url);
            // depending on which endpoint is matched here and what the status code is the app will decide on error message and / or clear app state and then show login screen again.
            console.log(error.response.request.responseURL);
        }
    }

    async logout() {
        this.dispatch({
            type: "LOGOUT_USER",
        });

        await deleteItemAsync(SECURE_STORE_VARS.authToken);
    }
}
