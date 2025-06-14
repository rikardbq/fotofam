import base from "./langs/base.json";

export type I18NBase = typeof base;
export type I18NKeys = keyof I18NBase;
export type I18NLanguages = "en_US" | "se_SV";

const mergeWithBase = (lang: Record<string, any>) => ({
    ...base,
    ...lang,
});

export const languages: Record<string, I18NLanguages> = {
    eng: "en_US",
    swe: "se_SV",
};

export default (lang: I18NLanguages) => {
    switch (lang) {
        case languages.eng:
            return mergeWithBase(require("./langs/en_US.json"));
        case languages.swe:
            return mergeWithBase(require("./langs/se_SV.json"));
    }

    return mergeWithBase(require("./langs/en_US.json"));
};
