import i18n, { languages } from "@/i18n";

export const useI18N = (lang: string = languages.eng) => {
    
    return i18n(lang);
};
