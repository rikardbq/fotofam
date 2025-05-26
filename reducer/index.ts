import image, { ImageState } from "@/reducer/imageReducer";
import user, { UserState } from "@/reducer/userReducer";
import post, { PostState } from "@/reducer/postReducer";

type Reducers = {
    image: typeof image.reducer;
    user: typeof user.reducer;
    post: typeof post.reducer;
    [x: string]: any;
};

export type Action = {
    type: string;
    data?: Record<string, any>;
};

export type State = {
    image: ImageState;
    user: UserState;
    post: PostState;
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
    post: post.reducer,
});

export const initialState = {
    image: image.initialState,
    user: user.initialState,
    post: post.initialState,
};
