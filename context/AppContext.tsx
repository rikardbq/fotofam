import { createContext } from "react";

import { useI18N } from "@/hooks/useI18N";
import AuthService from "@/service/AuthService";

import { I18NBase, languages } from "@/i18n";
import { Action, State, Store } from "@/reducer";

type AppContextDefaultState = {
    store: Store;
    localization: I18NBase;
    authService: AuthService;
};

export const AppContext: React.Context<AppContextDefaultState> =
    createContext<AppContextDefaultState>({
        store: [{} as State, {} as React.Dispatch<Action>],
        localization: {} as I18NBase,
        authService: {} as AuthService,
    });

type AppContextProviderProps = {
    store: Store;
    authService: AuthService;
    children: React.ReactNode;
};

export const AppContextProvider = ({
    store,
    authService,
    children,
}: AppContextProviderProps) => {
    const localization = useI18N(languages.swedish);

    return (
        <AppContext.Provider
            value={{
                store,
                localization,
                authService,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
