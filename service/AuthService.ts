import { getItemAsync, setItemAsync } from "expo-secure-store";
import { decodeJwt } from "jose";

import { Action } from "@/reducer";
import * as api from "@/api";
import { getAuthHeader } from "@/util/auth";

export type AuthRequest = {
    applicationId: string;
    username: string;
    password: string;
};

type TokenClaims = {
    iss: string;
    aud: string;
    iat: number;
    exp: number;
    "x-uname": string;
    "x-aid": string;
};

export default class AuthService {
    private dispatch: any;
    private state: any;
    private baseUrl: string = "http://192.168.0.22:8082"; // use env var in real scenario. start using dotenv files

    constructor([state, dispatch]: any) {
        this.dispatch = dispatch;
        this.state = state?.state;
    }

    async authenticate(body: AuthRequest) {
        const {
            data: { token: at },
        } = await api.post(`${this.baseUrl}/authenticate`, body);

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

            // const decodedToken: TokenClaims = decodeJwt(token);
            await setItemAsync("auth_t", token);

            return token;
            // dispatch set application state with username and extra things needed to conclude the login flow
        } catch (error: any) {
            // console.log(error.response.config.url);
            // depending on which endpoint is matched here and what the status code is the app will decide on error message and / or clear app state and then show login screen again.
            console.log(error.response.request.responseURL);
        }
    }
}
