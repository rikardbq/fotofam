import { createContext } from "react";

import { useI18N } from "@/hooks/useI18N";
import AuthService from "@/service/AuthService";

import { I18NBase, languages } from "@/i18n";

type AppContextDefaultState = {
    useStore: () => any[];
    useLocalization: () => I18NBase;
    useAuthService: () => AuthService;
    useAuthToken: () => string | null;
};

export const AppContext: React.Context<AppContextDefaultState> =
    createContext<AppContextDefaultState>({
        useStore: () => [],
        useLocalization: () => ({} as I18NBase),
        useAuthService: () => ({} as AuthService),
        useAuthToken: () => null,
    });

type AppContextProviderProps = {
    store: any[];
    authService: AuthService;
    authToken: string | null;
    children: React.ReactNode;
};

export const AppContextProvider = ({
    store,
    authService,
    authToken,
    children,
}: AppContextProviderProps) => {
    const localization = useI18N(languages.swedish);

    return (
        <AppContext.Provider
            value={{
                useStore: () => store,
                useLocalization: () => localization,
                useAuthService: () => authService,
                useAuthToken: () => authToken,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
