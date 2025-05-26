import { SQLiteDatabase } from "expo-sqlite";

export const initCache = async (db: SQLiteDatabase) => {
    await db.execAsync(`
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

export const destroyCache = async (db: SQLiteDatabase) => {
    await db.execAsync(`
        DROP INDEX IF EXISTS idx_images_name;
        DROP TABLE images;
    `);
};
