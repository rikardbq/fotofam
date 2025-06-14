import i18n, { I18NLanguages } from "@/i18n";

export const nowSeconds = () => Math.floor(Date.now() / 1000);
export const daySeconds = () => 86400;
export const getRelativeCreatedAt = (
    lang: I18NLanguages,
    createdAt: number
) => {
    const t = Math.abs(createdAt - Date.now() / 1000);
    const translation = i18n(lang);

    if (t >= 3600 && t < 86400) {
        // over or equal to 1 hour and less than 1 day
        const n = Math.floor(t / 3600);
        return `${n} ${
            n === 1
                ? translation["label.time.hour"]
                : translation["label.time.hours"]
        } ${translation["label.time.ago"]}`;
    } else if (t >= 86400 && t < 604800) {
        // over or equal to 1 day and less than 1 week
        const n = Math.floor(t / 86400);
        return `${n} ${
            n === 1
                ? translation["label.time.yesterday"]
                : `${translation["label.time.days"]} ${translation["label.time.ago"]}`
        }`;
    } else if (t >= 604800 && t < 907200) {
        // over or equal to 1 week and less than 1.5 weeks
        const n = Math.floor(t / 604800);
        return `${n} ${translation["label.time.week"]} ${translation["label.time.ago"]}`;
    } else if (t >= 907200) {
        // over or equal to 1.5 weeks
        const d = new Date(createdAt * 1000);
        return d.toISOString().split("T")[0];
    }

    return translation["label.time.justnow"];
};
