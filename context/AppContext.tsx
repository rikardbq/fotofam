import React, { createContext } from "react";

import { useI18N } from "@/hooks/useI18N";
import AuthService from "@/service/AuthService";

import { usePostService } from "@/hooks/useService";
import { ColorSchemes, useTheme } from "@/hooks/useTheme";
import { I18NBase } from "@/i18n";
import { Action, State, Store } from "@/reducer";
import PostService from "@/service/PostService";
import { AppTheme } from "@/util/theme";
import { SQLiteDatabase } from "expo-sqlite";

export type AppContextDefaultState = {
    theme: AppTheme;
    colorScheme: ColorSchemes;
    setColorScheme: React.Dispatch<React.SetStateAction<ColorSchemes>>;
    store: Store;
    cache: SQLiteDatabase;
    localization: I18NBase;
    authService: AuthService;
    postService: PostService;
};

export const AppContext: React.Context<AppContextDefaultState> =
    createContext<AppContextDefaultState>({
        theme: {} as AppTheme,
        colorScheme: "system" as ColorSchemes,
        setColorScheme: {} as React.Dispatch<
            React.SetStateAction<ColorSchemes>
        >,
        store: [{} as State, {} as React.Dispatch<Action>],
        cache: {} as SQLiteDatabase,
        localization: {} as I18NBase,
        authService: {} as AuthService,
        postService: {} as PostService,
    });

type AppContextProviderProps = {
    store: Store;
    cache: SQLiteDatabase;
    authService: AuthService;
    children: React.ReactNode;
};

export const AppContextProvider = ({
    store,
    cache,
    authService,
    children,
}: AppContextProviderProps) => {
    const localization = useI18N("en_US");
    const { theme, colorScheme, setColorScheme } = useTheme();
    const postService = usePostService(store);

    return (
        <AppContext.Provider
            value={{
                theme,
                colorScheme,
                setColorScheme,
                store,
                cache,
                localization,
                authService,
                postService,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

type AppContextConsumerProps = {
    children: (values: AppContextDefaultState) => React.ReactNode;
};

export const AppContextConsumer = ({ children }: AppContextConsumerProps) => {
    return <AppContext.Consumer>{children}</AppContext.Consumer>;
};
