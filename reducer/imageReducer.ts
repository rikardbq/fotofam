import { Action as RootAction } from "@/reducer";

const actions = {
    SET_CURRENT_PHOTO: "SET_CURRENT_PHOTO",
};

type ImageState = {
    currentPhoto: string;
};

const initialState: ImageState = {
    currentPhoto: "none",
};

type Action = RootAction & {
    data: {
        value: string;
    };
};

const reducer = (state: ImageState, action: Action) => {
    switch (action.type) {
        case "SET_CURRENT_PHOTO": {
            console.log("sick", action);

            return {
                ...state,
                currentPhoto: action.data.value,
            };
        }
        default: {
            return state;
        }
    }

    // throw error in the event that we dont use combineReducer functionality
    // throw Error("Unknown action: " + action.type);
};

export default { reducer, initialState, actions };
