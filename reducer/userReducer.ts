import { Action as RootAction } from "@/reducer";

const actions = {
    LOGIN_USER: "LOGIN_USER",
    SET_USER_DATA: "SET_USER_DATA",
};

type UserState = {
    auth_t?: string;
    username?: string;
    realName?: string;
};

const initialState: UserState = {
    auth_t: undefined,
    username: undefined,
    realName: undefined,
};

type Action = RootAction & {
    data: {
        value: {
            [key: string]: any;
        };
    };
};

const reducer = (state: UserState, action: Action) => {
    switch (action.type) {
        case actions.LOGIN_USER: {
            return {
                ...state,
                auth_t: action.data.value.auth_t,
                username: action.data.value.username,
            };
        }
        case actions.SET_USER_DATA: {
            return {
                ...state,
                realName: action.data.value.realName,
            };
        }
        // remember to check if i need this
        default: {
            return state;
        }
    }
};

// const useReducer = (reducer: any, initState: any) => {
//     const [reducerState, setReducerState] = useState(initState);
//     return [reducerState, (action: any) => setReducerState(reducer(reducerState, action))]
// }

// something like this for useService hook????
// const useService = (store: any) => {
//     const [services, setServices] = useState({
//         imageService: null, // new ImageService({ user: store.state.user, image: store.state.image })
//         userService: null, // new UserService({ user: store.state.user })
//     });

//     useEffect(() => {
//         services.imageService.setImageAndUser(store.state.user, store.state.image);
//         services.userService.setUser(store.state.user);
//     }, [store]);
// }

export default { reducer, initialState, actions };
