import AuthService from "@/service/AuthService";
import ImageService from "@/service/ImageService";
import { useMemo } from "react";

const serviceNames = {
    AUTH_SERVICE: "AUTH_SERVICE",
    IMAGE_SERVICE: "IMAGE_SERVICE",
    USER_SERVICE: "USER_SERVICE",
};

const services: { [key: string]: any } = {
    AUTH_SERVICE: (store: any) => new AuthService(store),
    IMAGE_SERVICE: (store: any) => new ImageService(store),
    // USER_SERVICE: (store: any) => new UserService(store),
};

const getService = (store: any, serviceName: string) =>
    services[serviceName](store);

export const useImageService = (store: any): ImageService => {
    const service = useMemo(
        () => getService(store, serviceNames.IMAGE_SERVICE),
        [store[0]]
    );

    return service;
};

export const useAuthService = (store: any): AuthService => {
    const service = useMemo(
        () => getService(store, serviceNames.AUTH_SERVICE),
        [store[0]]
    );

    return service;
};
