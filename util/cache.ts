import { SQLiteDatabase, SQLiteStatement } from "expo-sqlite";

export const initCache = async (db: SQLiteDatabase) => {
    await db.execAsync(`
        PRAGMA journal_mode = wal;
        PRAGMA synchronous = normal;
        PRAGMA auto_vacuum = full;
        PRAGMA analysis_limit=400;
        PRAGMA optimize;
        CREATE TABLE IF NOT EXISTS images(
            id INTEGER PRIMARY KEY,
            name TEXT UNIQUE NOT NULL,
            width INTEGER NOT NULL,
            height INTEGER NOT NULL,
            base64 TEXT NOT NULL
        );
        CREATE UNIQUE INDEX IF NOT EXISTS idx_images_name ON images (name);
    `);
};

// only useful if AUTOINCREMENT on PK
// UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='images';

export const resetCache = async (db: SQLiteDatabase) => {
    await db.execAsync("DELETE FROM images;");
};

// this is for admin purposes, in some profile settings page this can be used to completely reset cache and / or enable disable cache alltogether
export const destroyCache = async (db: SQLiteDatabase) => {
    await db.execAsync(`
        DROP INDEX IF EXISTS idx_images_name;
        DROP TABLE images;
    `);
};

export type Statements = Record<string, SQLiteStatement>;
