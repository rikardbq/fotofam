
import * as api from "@/api";
import { Action, State, Store } from "@/reducer";
import { createAuthHeader } from "@/util/auth";

export default class PostService {
    private state: State;
    private dispatch: React.Dispatch<Action>;

    constructor([state, dispatch]: Store) {
        this.state = state;
        this.dispatch = dispatch;
    }

    // change any[] to proper type later
    async getPosts(limit: number = 10, offset: number = 0): Promise<any[]> {
        try {
            const { data } = await api.get(
                `posts/${this.state.user.username}?limit=${limit}&offset=${offset}`,
                createAuthHeader(this.state.user.auth_t!)
            );

            this.dispatch({
                type: "SET_POSTS",
                data: {
                    values: {
                        posts: data,
                    },
                },
            });

            return data;
        } catch (error: any) {
            const response = error.response;
            const path = response.request.responseURL;
            const status = response.status;

            console.error(path);
            console.error(status);

            throw error;
        }
    }

    async getImageByName(imageName: string): Promise<any> {
        try {
            const { data } = await api.get(
                `images/${imageName}`,
                createAuthHeader(this.state.user.auth_t!)
            );

            return data;
        } catch (error: any) {
            const response = error.response;
            const path = response.request.responseURL;
            const status = response.status;

            console.error(path);
            console.error(status);

            throw error;
        }
    }
}
