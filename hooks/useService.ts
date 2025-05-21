import { useMemo } from "react";

import { Store } from "@/reducer";

import AuthService from "@/service/AuthService";
import ImageService from "@/service/ImageService";

const serviceNames = {
    AUTH_SERVICE: "AUTH_SERVICE",
    IMAGE_SERVICE: "IMAGE_SERVICE",
    USER_SERVICE: "USER_SERVICE",
};

const services: { [key: string]: any } = {
    AUTH_SERVICE: (store: Store) => new AuthService(store),
    IMAGE_SERVICE: (store: Store) => new ImageService(store),
    // USER_SERVICE: (store: any) => new UserService(store),
};

const getService = (serviceName: string, store: Store, ...extraArgs: any) =>
    services[serviceName](store, ...extraArgs);

export const useImageService = (store: Store): ImageService => {
    const service = useMemo(
        () => getService(serviceNames.IMAGE_SERVICE, store),
        [store[0]]
    );

    return service;
};

export const useAuthService = (store: Store): AuthService => {
    const service = useMemo(
        () => getService(serviceNames.AUTH_SERVICE, store),
        [store[0]]
    );

    return service;
};
