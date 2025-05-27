import { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";

import { CACHE } from "@/util/constants";

export const useCache = (
    onInit: (a: SQLite.SQLiteDatabase) => Promise<void>
): {
    cache: SQLite.SQLiteDatabase | null;
    cacheLoading: boolean;
} => {
    const [cache, setCache] = useState<SQLite.SQLiteDatabase | null>(null);
    const [cacheLoading, setCacheLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const db = await SQLite.openDatabaseAsync(CACHE.DB_NAME);
            await onInit(db);
            setCache(db);
            setCacheLoading(false);
        })();
    }, []);

    return { cache, cacheLoading };
};
