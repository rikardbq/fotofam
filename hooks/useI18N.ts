import i18n, { I18NLanguages, languages } from "@/i18n";

export const useI18N = (lang: I18NLanguages = languages.eng) => {
    return i18n(lang);
};
