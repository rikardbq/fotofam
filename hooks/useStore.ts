import { useMemo, useReducer } from "react";

import { rootReducer, initialState, Store } from "@/reducer";

export const useStore = () => {
    const [state, dispatch] = useReducer(rootReducer, initialState);
    const store: Store = useMemo(
        () => [state, dispatch],
        [state]
    );

    return store;
};
