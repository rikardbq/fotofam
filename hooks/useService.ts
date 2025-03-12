import ImageService from "@/service/ImageService";
import { useMemo } from "react";

const serviceNames = {
    IMAGE_SERVICE: "IMAGE_SERVICE",
    USER_SERVICE: "USER_SERVICE",
};

const services: { [key: string]: any } = {
    IMAGE_SERVICE: (store: any) => new ImageService(store),
    // USER_SERVICE: (store: any) => new UserService(store),
};

const getService = (store: any, serviceName: string) =>
    services[serviceName](store);

export const useImageService = (store: any) => {
    const service = useMemo(
        () => getService(store, serviceNames.IMAGE_SERVICE),
        [store[0]]
    );

    return service;
};
