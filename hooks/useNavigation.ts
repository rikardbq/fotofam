import {
    NavigationProp,
    ParamListBase,
    useNavigation as useRNNav,
} from "@react-navigation/native";

export const useNavigation = () => {
    const navigation: NavigationProp<ParamListBase> = useRNNav();

    return navigation;
};
