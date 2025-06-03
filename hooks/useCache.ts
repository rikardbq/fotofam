import { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";

import { CACHE } from "@/util/constants";

export const useCache = (
    onInit: (a: SQLite.SQLiteDatabase) => Promise<void>
): {
    cache: SQLite.SQLiteDatabase | null;
    cacheLoaded: boolean;
} => {
    const [cache, setCache] = useState<SQLite.SQLiteDatabase | null>(null);
    const [cacheLoaded, setCacheLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            const db = await SQLite.openDatabaseAsync(CACHE.DB_NAME);
            await onInit(db);
            setCache(db);
            setCacheLoaded(true);
        })();
    }, []);

    return { cache, cacheLoaded };
};
