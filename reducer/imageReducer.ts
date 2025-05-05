import { Action as RootAction } from "@/reducer";

const actions = {
    SET_CURRENT_PHOTO: "SET_CURRENT_PHOTO",
    SET_CROPPED_PHOTO: "SET_CROPPED_PHOTO",
    SET_PHOTOS: "SET_PHOTOS",
};

type ImageState = {
    currentPhoto: any;
    croppedPhoto: any;
    photos: any[];
};

const initialState: ImageState = {
    currentPhoto: {
        path: "none",
        width: 0,
        height: 0,
    },
    croppedPhoto: {
        path: "none",
        width: 0,
        height: 0,
    },
    photos: [],
};

type Action = RootAction & {
    data: {
        value: any;
    };
};

const reducer = (state: ImageState, action: Action) => {
    switch (action.type) {
        case actions.SET_CURRENT_PHOTO: {
            console.log("sick", action);

            return {
                ...state,
                currentPhoto: {
                    path: action.data.value.path,
                    width: action.data.value.width,
                    height: action.data.value.height,
                },
            };
        }
        case actions.SET_CROPPED_PHOTO: {
            return {
                ...state,
                croppedPhoto: {
                    path: action.data.value.path,
                    width: action.data.value.width,
                    height: action.data.value.height,
                },
            };
        }
        case actions.SET_PHOTOS: {
            return {
                ...state,
                photos: action.data.value,
            };
        }
        // remember to check if i need this
        default: {
            return state;
        }
    }

    // throw error in the event that we dont use combineReducer functionality
    // throw Error("Unknown action: " + action.type);
};

export default { reducer, initialState, actions };
