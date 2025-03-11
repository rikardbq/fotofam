import image from "@/reducer/imageReducer";
import user from "@/reducer/userReducer";

type Reducers = {
    image: typeof image.reducer;
    user: typeof user.reducer;
    [key: string]: any;
};

export type Action = {
    type: string;
    data: {
        [key: string]: string;
    };
};

const combineReducers = (slices: any) => (state: any, action: any) =>
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
