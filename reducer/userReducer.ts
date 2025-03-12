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
