import { useMemo, useReducer } from "react";
import { createContext } from "react";

import { rootReducer, initialState } from "@/reducer";
import image from "@/reducer/imageReducer";

type AppContextDefaultState = {
    useStore: any
};

export const AppContext: React.Context<AppContextDefaultState> = createContext({
    useStore: null
});

type AppContextProviderProps = {
    children: React.ReactNode;
};

const useStore = (store: any[]) => () => store;

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
    const [state, dispatch] = useReducer(rootReducer, initialState);
    const store = useMemo(() => [state, dispatch], [state]);
    return (
        <AppContext.Provider
            value={{
                useStore: useStore(store),
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
