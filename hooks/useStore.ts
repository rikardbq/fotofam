import { useMemo, useReducer } from "react";

import { rootReducer, initialState } from "@/reducer";

export const useStore = () => {
    const [state, dispatch] = useReducer(rootReducer, initialState);
    const store: any = useMemo(() => [state, dispatch], [state]);

    return store;
};
