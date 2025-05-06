import image, { ImageState } from "@/reducer/imageReducer";
import user, { UserState } from "@/reducer/userReducer";

type Reducers = {
    image: typeof image.reducer;
    user: typeof user.reducer;
    [x: string]: any;
};

export type Action = {
    type: string;
    data: Record<string, any>
};

export type State = {
    image: ImageState;
    user: UserState;
    [x: string]: any;
};

export type Store = [s: State, d: React.Dispatch<Action>];

const combineReducers = (slices: Reducers) => (state: State, action: Action) =>
    Object.keys(slices).reduce(
        (acc, prop) => ({
            ...acc,
            [prop]: slices[prop](acc[prop], action),
        }),
        state
    );

export const rootReducer = combineReducers({
    image: image.reducer,
    user: user.reducer,
});

export const initialState = {
    image: image.initialState,
    user: user.initialState,
};
