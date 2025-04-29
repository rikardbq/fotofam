import { AppContext } from "@/context/AppContext";
import { I18NKeys } from "@/i18n";
import { useContext } from "react";
import { GestureResponderEvent } from "react-native";
import BaseButton from "../BaseButton";

type LocalizedButton = {
    label: I18NKeys;
    onPress?: (e: GestureResponderEvent) => void;
};

export default ({ label, onPress }: LocalizedButton) => {
    const { useLocalization } = useContext(AppContext);
    const i18n = useLocalization();

    return <BaseButton onPress={onPress} label={i18n[label]} />;
};
