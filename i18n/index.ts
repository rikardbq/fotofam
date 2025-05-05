import base from "./langs/base.json";

export type I18NBase = typeof base;
export type I18NKeys = keyof I18NBase;

const mergeWithBase = (lang: Record<string, any>) => ({
    ...base,
    ...lang,
});

export const languages = {
    english: "en_US",
    swedish: "se_SV",
};

export default (lang: string) => {
    switch (lang) {
        case languages.english:
            return mergeWithBase(require("./langs/en_US.json"));
        case languages.swedish:
            return mergeWithBase(require("./langs/se_SV.json"));
        default:
            return mergeWithBase(require("./langs/en_US.json"));
    }
};
