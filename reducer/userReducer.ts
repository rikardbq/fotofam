import { Action as RootAction } from "@/reducer";

const actions = {
    SET_CURRENT_USER: "SET_CURRENT_USER",
};

type UserState = {
    currentUser: string;
};

const initialState: UserState = {
    currentUser: "none",
};

type Action = RootAction & {
    data: {
        value: string;
    };
};

const reducer = (state: UserState, action: Action) => {
    switch (action.type) {
        case actions.SET_CURRENT_USER: {
            return {
                ...state,
                currentUser: action.data.value,
            };
        }
        default: {
            return state;
        }
    }
};

export default { reducer, initialState, actions };
