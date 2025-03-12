import ImageService from "@/service/ImageService";
import { useEffect, useMemo, useState } from "react";

// probably just migrate to "free" function calls in a "file namespace"
// OR use the services as part of the app root state
export const useService = (store: any) => {
    const [imageService, setImageService] = useState(new ImageService(store));
    const [state, dispatch] = store;

    useEffect(() => {
        console.log("saTATEWRTET ERT ", state.image);
        
        setImageService(new ImageService(store));
    }, [state.image]);

    return { imageService };
};
