export const ROUTES = {
    TABS: {
        FEED: "index",
        ADD_POST: "add_post",
        PERSONAL: "personal",
    },
    SCREENS: {
        CAMERA: "(screens)/camera",
    },
};

export const SECURE_STORE_VARS = {
    authToken: "auth_t",
    lastLogin: "last_login",
    colorScheme: "user_color_scheme",
};

export const FONT_NAMES = {
    RUBIK_LIGHT: "RubikLight",
    RUBIK_REGULAR: "RubikRegular",
    RUBIK_MEDIUM: "RubikMedium",
    RUBIK_BOLD: "RubikBold",
    RUBIK_LIGHT_ITALIC: "RubikLightItalic",
    RUBIK_REGULAR_ITALIC: "RubikRegularItalic",
    RUBIK_MEDIUM_ITALIC: "RubikMediumItalic",
    RUBIK_BOLD_ITALIC: "RubikBoldItalic",
};

export const CACHE = {
    DB_NAME: "cache.db",
    STATEMENTS: {
        INSERT: {
            IMAGE: "INSERT INTO images (name, width, height, base64) VALUES ($name, $width, $height, $base64)",
        },
        GET: {
            IMAGE: "SELECT name, width, height, base64 FROM images WHERE name = $name",
        },
    },
};
