import { Action as RootAction } from "@/reducer";

const actions = {
    SET_TOKEN: "SET_TOKEN",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    SET_USER_DATA: "SET_USER_DATA",
};

export type UserState = {
    auth_t?: string;
    loggedIn: boolean;
    username?: string;
    realName?: string;
};

const initialState: UserState = {
    auth_t: undefined,
    loggedIn: false,
    username: undefined,
    realName: undefined,
};

type Action = RootAction & {
    data: {
        values: Record<string, any>;
    };
};

const reducer = (state: UserState, action: Action) => {
    switch (action.type) {
        case actions.SET_TOKEN: {
            return {
                ...state,
                auth_t: action.data.values.auth_t,
            };
        }
        case actions.LOGIN_USER: {
            return {
                ...state,
                auth_t: action.data.values.auth_t,
                loggedIn: action.data.values.loggedIn,
                username: action.data.values.username,
                realName: action.data.values.realName,
            };
        }
        case actions.LOGOUT_USER: {
            return initialState;
        }
        case actions.SET_USER_DATA: {
            return {
                ...state,
                realName: action.data.values.realName,
            };
        }
        default: {
            return state;
        }
    }
};

export default { reducer, initialState, actions };
