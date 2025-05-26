import LocalizedButton from "@/components/buttons/i18n/LocalizedButton";
import { RefreshableScrollContainer } from "@/components/container/RefreshableScrollContainer";
import { AppContext } from "@/context/AppContext";
import { useNavigation } from "@/hooks/useNavigation";
import { useImageService } from "@/hooks/useService";
import axios from "axios";
import { Link } from "expo-router";
import { useContext, useState } from "react";
import { Button, Image, StyleSheet, View } from "react-native";
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
    const { store, localization } = useContext(AppContext);
    const [state, dispatch] = store;
    const imageService = useImageService([state, dispatch]);
    const {
        image: { photos },
    } = state;
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
        <RefreshableScrollContainer route="personal">
            <LocalizedButton
                label="label.login"
                onPress={() => nav.navigate("experiment/component_test")}
            />
            <Button
                title={localization["label.next"]}
                onPress={() => {} /*getData()*/}
            />
            <View style={{ backgroundColor: "#fff" }}>
                <Link
                    href={"/post/123" as any}
                    style={{ height: 200 }}
                    withAnchor
                >
                    Go to post
                </Link>
            </View>
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
        </RefreshableScrollContainer>
    );
}
