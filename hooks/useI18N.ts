import i18n, { I18NLanguages } from "@/i18n";

export const useI18N = (lang: I18NLanguages = "en_US") => {
    return i18n(lang);
};
