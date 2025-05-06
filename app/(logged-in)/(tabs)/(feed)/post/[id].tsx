import { BaseContainer } from "@/components/container/BaseContainer";
import { ScrollContainer } from "@/components/container/ScrollContainer";
import { Post } from "@/components/post/Post";
import { AppContext } from "@/context/AppContext";
import { useLocalSearchParams } from "expo-router";
import { useContext, useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default (props: any) => {
    const { id: postId } = useLocalSearchParams();
    const insets = useSafeAreaInsets();
    const { store } = useContext(AppContext);
    const [state, dispatch] = store;

    useEffect(() => {
        console.log(postId);
    }, []);

    const testHeight = Dimensions.get("window").height * 0.75;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#000",
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        },
        content: {
            flex: 1,
            padding: 12,
            gap: 16,
            overflow: "hidden",
        },
    });

    return (
        <BaseContainer>
            <ScrollContainer>
                <Post
                    imageProps={{
                        src: `file://${state.image.croppedPhoto.path}`,
                        height: state.image.croppedPhoto.height,
                        width: state.image.croppedPhoto.width,
                    }}
                />
            </ScrollContainer>
        </BaseContainer>
    );
};
