import base from "./langs/base.json";

export type I18NBase = typeof base;
export type I18NKeys = keyof I18NBase;
export type I18NLanguages = "en_US" | "se_SV";

const mergeWithBase = (lang: I18NBase) => ({
    ...base,
    ...lang,
});

export default (lang: I18NLanguages | undefined) => {
    switch (lang) {
        case "en_US":
            return mergeWithBase(require("./langs/en_US.json"));
        case "se_SV":
            return mergeWithBase(require("./langs/se_SV.json"));
    }

    return mergeWithBase(require("./langs/en_US.json"));
};
