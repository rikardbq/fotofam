import { Action } from "@/reducer";
import * as api from "@/api";

export default class ImageService {
    private dispatch: any;
    private image: any;
    private user: any;

    constructor([state, dispatch]: any) {
        this.dispatch = dispatch;
        this.image = state?.image;
        this.user = state?.user;
    }

    setImage(image: any) {
        this.image = image;
    }

    getCurrentPhoto() {
        return this.image?.currentPhoto;
    }

    async getAllImages() {
        const user = this.user.username;
        const userToken = this.user.token;

        // const data = await api.get(`/images/${user}`, { "Bearer": userToken });
        // this.dispatch({ type: "GET_ALL_IMAGES_FOR_USER", data: { value: data.json() }});
    }
}
