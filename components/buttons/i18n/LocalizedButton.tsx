import { AppContext } from "@/context/AppContext";
import { I18NKeys } from "@/i18n";
import { useContext } from "react";
import { GestureResponderEvent } from "react-native";
import BaseButton from "../BaseButton";

type LocalizedButton = {
    label: I18NKeys | (string & {});
    onPress?: (e: GestureResponderEvent) => void;
    disabled?: boolean;
};

export default ({ label, onPress, disabled }: LocalizedButton) => {
    const { localization: i18n } = useContext(AppContext);

    return <BaseButton disabled={disabled} onPress={onPress} label={i18n[label as I18NKeys] ?? label} />;
};
