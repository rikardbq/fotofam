import { Action } from "@/reducer";
import * as api from "@/api";

export default class ImageService {
    private image: any;
    private user: any;

    constructor([state, dispatch]: any) {
        this.image = state?.image;
        this.user = state?.user;
    }

    setImage(image: any) {
        this.image = image;
    }

    getCurrentPhoto() {
        return this.image?.currentPhoto;
    }
}
