import { Action as RootAction } from "@/reducer";

const actions = {
    SET_POSTS: "SET_POSTS",
};

export type PostState = {
    posts?: any[];
};

const initialState: PostState = {
    posts: undefined,
};

type Action = RootAction & {
    data: {
        values: Record<string, any>;
    };
};

const reducer = (state: PostState, action: Action) => {
    switch (action.type) {
        case actions.SET_POSTS: {
            return {
                ...state,
                posts: action.data.values.posts,
            };
        }
    }
};

export default { reducer, initialState, actions };
