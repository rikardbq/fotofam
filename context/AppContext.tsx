import { useEffect, useState } from "react";
import { createContext } from "react";

type AppContextDefaultState = {
    currentPhoto: any;
    setCurrentPhoto: any;
};

export const AppContext: React.Context<AppContextDefaultState> = createContext({
    currentPhoto: null,
    setCurrentPhoto: null,
});

type AppContextProviderProps = {
    children: React.ReactNode;
};

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
    const [currentPhoto, setCurrentPhoto] = useState(null);

    return (
        <AppContext.Provider
            value={{
                currentPhoto,
                setCurrentPhoto,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
