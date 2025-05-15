import { deleteItemAsync, setItemAsync } from "expo-secure-store";
import { decodeJwt } from "jose";

import * as api from "@/api";
import { appID } from "@/fotofamExtra.json";
import { createAuthHeader, TokenClaims } from "@/util/auth";
import { SECURE_STORE_VARS } from "@/util/constants";
import { UserState } from "@/reducer/userReducer";
import { Action, State, Store } from "@/reducer";

export type AuthRequest = {
    username: string;
    password: string;
};

export default class AuthService {
    private state: UserState;
    private dispatch: React.Dispatch<Action>;
    private authToken: string | null = null;
    private baseUrl: string = "http://192.168.0.22:8082"; // use env var in real scenario. start using dotenv files

    constructor([state, dispatch]: Store, authToken: string | null) {
        this.state = state.user;
        this.dispatch = dispatch;
        this.authToken = authToken;
    }

    getAuthToken() {
        return this.authToken;
    }

    async authenticate(body: AuthRequest) {
        try {
            const {
                data: { token: at },
            } = await api.post(`${this.baseUrl}/authenticate`, body);
    
            const {
                data: { token: rt },
            } = await api.post(
                `${this.baseUrl}/authorize`,
                undefined,
                createAuthHeader(at)
            );
    
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

    async login(rt: string) {
        try {
            const {
                data: { token },
            } = await api.post(
                `${this.baseUrl}/login`,
                undefined,
                createAuthHeader(rt)
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
            const response = error.response;
            const path = response.request.responseURL;
            const status = response.status;
            
            console.error(path);
            console.error(status);
            
            if (status === 401 || status === 403) {
                await deleteItemAsync(SECURE_STORE_VARS.authToken);
            }

            throw error;
        }
    }

    async logout() {
        try {
            this.dispatch({
                type: "LOGOUT_USER",
            });

            await deleteItemAsync(SECURE_STORE_VARS.authToken);
            await api.post(
                `${this.baseUrl}/revoke/${this.state.username}`,
                undefined
            );
        } catch (error: any) {
            // console.log(error.response.config.url);
            // depending on which endpoint is matched here and what the status code is the app will decide on error message and / or clear app state and then show login screen again.
            console.log(error.response.request.responseURL);
        }
    }
}
