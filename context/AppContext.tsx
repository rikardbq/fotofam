import { useEffect, useMemo, useReducer, useState } from "react";
import { createContext } from "react";

import { rootReducer, initialState } from "@/reducer";
import image from "@/reducer/imageReducer";
import ImageService from "@/service/ImageService";
import { useStore } from "@/hooks/useStore";
import { useDoubleTap } from "@/hooks/useDoubleTap";
import {
    useNavigation,
    ParamListBase,
    NavigationProp,
} from "@react-navigation/native";
import { useI18N } from "@/hooks/useI18N";
import { I18NKeys, I18NBase, languages } from "@/i18n";
// import { useService } from "@/hooks/useService";

type AppContextDefaultState = {
    useStore: () => any[];
    useDoubleTap: () => {
        isDoubleTap: boolean;
        doubleTapHandler: () => void;
    };
    useNavigation: () => NavigationProp<ParamListBase>;
    useLocalization: () => I18NBase;
    // useService: any;
};

export const AppContext: React.Context<AppContextDefaultState> =
    createContext<AppContextDefaultState>({
        useStore: () => [],
        useDoubleTap: () => ({
            isDoubleTap: false,
            doubleTapHandler: () => {},
        }),
        useNavigation: () => ({} as NavigationProp<ParamListBase>),
        useLocalization: () => ({} as I18NBase),
    });

type AppContextProviderProps = {
    children: React.ReactNode;
};

// const useService = (store: any) => () => {
//     const [services, setServices] = useState({
//         imageService: new ImageService(store), // new ImageService({ user: store.state.user, image: store.state.image })
//         userService: null, // new UserService({ user: store.state.user })
//     });

//     useEffect(() => {
//         console.log("redoing stuff?");

//         setServices({
//             ...services,
//             imageService: new ImageService(store),
//         });
//         // services.userService.setUser(store.state.user);
//     }, [store]);

//     return services;
// };

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
    const store = useStore();
    const doubleTap = useDoubleTap();
    const navigation: NavigationProp<ParamListBase> = useNavigation();
    const localization = useI18N(languages.swedish);
    // const services = useService(store);
    // const service = useMemo(() => {
    //     console.log("asdasdasdasd");
    //     console.log(service);

    //     return {
    //     imageService: new ImageService(store)}
    // }, [store]);

    // const [services, setServices] = useState({
    //     imageService: new ImageService(store), // new ImageService({ user: store.state.user, image: store.state.image })
    //     userService: null as any, // new UserService({ user: store.state.user })
    // });

    // useEffect(() => {
    //     console.log("redoing stuff?");
    //     console.log("INSIDE EFFECT ---> ", store, "services from state -> ", services);
    //     setServices({
    //         ...services,
    //         imageService: new ImageService(store)
    //     })
    // }, [store]);

    // useEffect(() => {
    //     console.log("changed ", services.imageService);

    // }, [services]);

    // console.log("SERVICES --> ", services);

    return (
        <AppContext.Provider
            value={{
                useStore: () => store,
                useDoubleTap: () => doubleTap,
                useNavigation: () => navigation,
                useLocalization: () => localization,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
