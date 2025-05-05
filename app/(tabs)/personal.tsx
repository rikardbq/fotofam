import { AppContext } from "@/context/AppContext";
import { useContext, useEffect, useState } from "react";
import {
    Button,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useImageService } from "@/hooks/useService";
import axios from "axios";
import Animated from "react-native-reanimated";
import { useI18N } from "@/hooks/useI18N";
import { languages } from "@/i18n";
import LocalizedButton from "@/components/buttons/i18n/LocalizedButton";
import { ScrollContainer } from "@/components/container/ScrollContainer";
import { useNavigation } from "@/hooks/useNavigation";
// import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 12,
        gap: 16,
        overflow: "hidden",
    },
});

/*
SELECT COUNT(*) FROM images; // to get a placeholder number value for lazy loading to not look completely off
i.e a number (count) of placeholder grey images that are in place for the real images as u lazy load scroll

LAZY LOAD CHUNKS of images, i.e limit response size and select from db, a subset based on scrolling on the page
SELECT * FROM images where username = ? AND created_at > ? LIMIT 20;
SELECT * FROM images where username = ? LIMIT 20 OFFSET ?; // ? meaning whatever number i choose. I.E state of "scroll chunks" * 20

username = store.currentUser
created_at = photos[photos.length - 1]?.created_at ?? 0;
*/

export default function Index(props: any) {
    console.log(props);
    const { useStore } = useContext(AppContext);
    const [state, dispatch] = useStore();
    const imageService = useImageService([state, dispatch]);
    const {
        image: { photos },
    } = state;
    const i18n = useI18N(languages.swedish);
    const nav = useNavigation();

    const [tex, setTex] = useState("");

    const getData = () => {
        axios
            .get("http://192.168.0.22:8082/images?count=true", {
                headers: {
                    Accept: "application/json",
                    "Accept-Charset": "UTF-8",
                },
            })
            .then((a: any) => {
                dispatch({ type: "SET_PHOTOS", data: { value: a.data } });
            })
            .catch((e) => console.log(JSON.stringify(e)));
    };

    return (
        <ScrollContainer>
            <LocalizedButton label="label.previous" onPress={() => nav.navigate("(screens)/component_test")} />
            <Button title={i18n["label.next"]} onPress={() => getData()} />
            {photos.map((photo: any) => (
                <Image
                    key={photo.id}
                    source={{ uri: photo.file_str }}
                    style={{
                        width: "100%",
                        height: 400,
                        // objectFit: "contain",
                    }}
                />
            ))}
        </ScrollContainer>
    );
}
