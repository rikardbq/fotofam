import { Action as RootAction } from "@/reducer";

const actions = {
    SET_POSTS_FEED: "SET_POSTS_FEED",
    SET_POSTS_PERSONAL: "SET_POSTS_PERSONAL",
};

export type PostState = {
    feed: {
        posts?: any[];
    };
    personal: {
        posts?: any[];
    };
};

const initialState: PostState = {
    feed: {
        posts: undefined,
    },
    personal: {
        posts: undefined,
    },
};

type Action = RootAction & {
    data: {
        values: Record<string, any>;
    };
};

const reducer = (state: PostState, action: Action) => {
    switch (action.type) {
        case actions.SET_POSTS_FEED: {
            return {
                ...state,
                feed: {
                    ...state?.feed,
                    posts: action.data.values.posts,
                },
            };
        }
        case actions.SET_POSTS_PERSONAL: {
            return {
                ...state,
                personal: {
                    ...state?.personal,
                    posts: action.data.values.posts,
                },
            };
        }
    }
};

export default { reducer, initialState, actions };
