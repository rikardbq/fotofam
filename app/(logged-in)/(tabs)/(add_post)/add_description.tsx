import LocalizedButton from "@/components/buttons/i18n/LocalizedButton";
import { BaseContainer } from "@/components/container/BaseContainer";
import { AppContext } from "@/context/AppContext";
import { useNavigation } from "@/hooks/useNavigation";
import { PADDINGS } from "@/util/globalStyles";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { Dimensions, Image, StyleSheet, TextInput } from "react-native";

import { CommonActions } from "@react-navigation/native";
import { getBase64 } from "@/util/encoding";

const styles = StyleSheet.create({
    description: {
        padding: PADDINGS.md,
        borderColor: "#ffffff",
        color: "#ffffff",
        // height: 350,
    },
});

export default () => {
    const navigation = useNavigation();
    const router = useRouter();
    const [description, setDescription] = useState<string>();
    const { store, postService } = useContext(AppContext);
    const [state, dispatch] = store;
    const image = state.post.addPostFlow.image;

    return (
        <BaseContainer>
            <Image
                src={image.path}
                style={{
                    width: Dimensions.get("window").width,
                    backgroundColor: "#2222ff",
                    aspectRatio: 1 / 1,
                    resizeMode: "contain",
                    objectFit: "contain",
                }}
            />
            <TextInput
                editable
                multiline
                numberOfLines={10}
                maxLength={250}
                onChangeText={(text) => setDescription(text)}
                value={description}
                style={styles.description}
            />
            <LocalizedButton
                label="label.next"
                disabled={typeof description === "undefined"}
                onPress={async () => {
                    try {
                        const result = await fetch(image.path!);
                        const data = await result.blob();
                        const b64Data = (await getBase64(data)) as string;

                        await postService.createPost(b64Data, description!);

                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: "index" }],
                            })
                        );
                    } catch (error: any) {
                        console.log(error);
                    }
                }}
            />
        </BaseContainer>
    );
};
