import * as api from "@/api";
import { Action, State, Store } from "@/reducer";
import { createAuthHeader } from "@/util/auth";
import { CACHE } from "@/util/constants";
import { SQLiteDatabase } from "expo-sqlite";

export default class PostService {
    private state: State;
    private dispatch: React.Dispatch<Action>;

    constructor([state, dispatch]: Store) {
        this.state = state;
        this.dispatch = dispatch;
    }

    private async getPosts(
        limit: number = 10,
        offset: number = 0,
        username?: string
    ) {
        const path = `posts${
            !!username ? `/${username!}` : ""
        }?limit=${limit}&offset=${offset}`;

        const { data } = await api.get(
            path,
            createAuthHeader(this.state.user.auth_t!)
        );

        return data;
    }

    async getPostsForPersonal(
        limit: number = 10,
        offset: number = 0
    ): Promise<any[]> {
        try {
            const posts = await this.getPosts(
                limit,
                offset,
                this.state.user.username
            );

            this.dispatch({
                type: "SET_POSTS_PERSONAL",
                data: {
                    values: {
                        posts,
                    },
                },
            });

            return posts;
        } catch (error: any) {
            const response = error.response;
            const path = response.request.responseURL;
            const status = response.status;

            console.error(path);
            console.error(status);

            throw error;
        }
    }

    // change any[] to proper type later
    async getPostsForFeed(
        limit: number = 10,
        offset: number = 0
    ): Promise<any[]> {
        try {
            const posts = await this.getPosts(limit, offset);

            this.dispatch({
                type: "SET_POSTS_FEED",
                data: {
                    values: {
                        posts,
                    },
                },
            });

            return posts;
        } catch (error: any) {
            const response = error.response;
            const path = response.request.responseURL;
            const status = response.status;

            console.error(path);
            console.error(status);

            throw error;
        }
    }

    async getImageByName(
        imageName: string,
        setImage: React.SetStateAction<any>,
        cache?: SQLiteDatabase
    ): Promise<any> {
        const fetchImage = async () => {
            const { data } = await api.get(
                `images/${imageName}`,
                createAuthHeader(this.state.user.auth_t!)
            );

            return data;
        };

        if (!cache) {
            const image = await fetchImage();
            setImage(image);
        }

        const getImageStatement = await cache?.prepareAsync(
            CACHE.STATEMENTS.GET.IMAGE
        );

        const insertImageStatement = await cache?.prepareAsync(
            CACHE.STATEMENTS.INSERT.IMAGE
        );

        try {
            let image: any = await (
                await getImageStatement?.executeAsync({
                    $name: imageName,
                })
            )?.getFirstAsync();

            if (!image) {
                image = await fetchImage();

                await insertImageStatement?.executeAsync({
                    $name: image.name,
                    $width: image.width,
                    $height: image.height,
                    $base64: image.base64,
                });
            }

            if (!!image) {
                setImage(image);
            }
        } catch (error: any) {
            const response = error.response;
            const path = response.request.responseURL;
            const status = response.status;

            console.error(path);
            console.error(status);

            throw error;
        } finally {
            await getImageStatement?.finalizeAsync();
            await insertImageStatement?.finalizeAsync();
        }
    }
}
