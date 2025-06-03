import { Action as RootAction } from "@/reducer";

const actions = {
    SET_POSTS_FEED: "SET_POSTS_FEED",
    SET_POSTS_PERSONAL: "SET_POSTS_PERSONAL",
    SET_ADD_POST_FLOW_IMAGE: "SET_ADD_POST_FLOW_IMAGE",
    SET_ADD_POST_FLOW_DESCRIPTION: "SET_ADD_POST_FLOW_DESCRIPTION",
};

export type PostState = {
    feed: {
        posts?: any[];
    };
    personal: {
        posts?: any[];
    };
    addPostFlow: {
        image: {
            name?: string;
            width?: string;
            height?: string;
            path?: string;
        };
        description?: string;
    };
};

const initialState: PostState = {
    feed: {
        posts: undefined,
    },
    personal: {
        posts: undefined,
    },
    addPostFlow: {
        image: {
            name: undefined,
            width: undefined,
            height: undefined,
            path: undefined,
        },
        description: undefined,
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
        case actions.SET_ADD_POST_FLOW_IMAGE: {
            return {
                ...state,
                addPostFlow: {
                    ...state?.addPostFlow,
                    image: action.data.values.image,
                },
            };
        }
        case actions.SET_ADD_POST_FLOW_DESCRIPTION: {
            return {
                ...state,
                addPostFlow: {
                    ...state?.addPostFlow,
                    description: action.data.values.description,
                },
            };
        }
        default: {
            return state;
        }
    }
};

export default { reducer, initialState, actions };
