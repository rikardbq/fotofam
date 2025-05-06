import { Post } from "@/components/post/Post";
import { AppContext } from "@/context/AppContext";
import { useContext, useEffect, useState } from "react";
import {
    Button,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Animated from "react-native-reanimated";
import Constants from "expo-constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BaseContainer } from "@/components/container/BaseContainer";
import { ScrollContainer } from "@/components/container/ScrollContainer";
import { Link } from "expo-router";
// import { useStore } from "@/hooks/useStore";
const statusBarHeight = Constants.statusBarHeight;

export default (props: any) => {
    const insets = useSafeAreaInsets();
    const { store } = useContext(AppContext);
    const [state, dispatch] = store;

    // const {
    //     image: { currentPhoto, croppedPhoto },
    // } = state;
    useEffect(() => {
        console.log("STATE ---> ", state);
    }, []);

    useEffect(() => {
        console.log("wasup", state);
    }, [state]);

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
            {/* <Image
                src={`file://${croppedPhoto.path}`}
                style={{
                    width: Dimensions.get("window").width,
                    aspectRatio: 1 / 1,
                    resizeMode: "contain",
                }}
            /> */}
            <View style={{ backgroundColor: "#fff" }}>
                <Link href={"/post/123" as any} style={{ height: 200 }} withAnchor>
                    Go to post
                </Link>
            </View>

            <ScrollContainer>
                <Post
                    imageProps={{
                        src: `file://${state.image.croppedPhoto.path}`,
                        height: state.image.croppedPhoto.height,
                        width: state.image.croppedPhoto.width,
                    }}
                />
                <Post
                    imageProps={{
                        src: `file://${state.image.croppedPhoto.path}`,
                        height: state.image.croppedPhoto.height,
                        width: state.image.croppedPhoto.width,
                    }}
                />
                <Post
                    imageProps={{
                        src: `file://${state.image.croppedPhoto.path}`,
                        height: state.image.croppedPhoto.height,
                        width: state.image.croppedPhoto.width,
                    }}
                />
                <Post
                    imageProps={{
                        src: `file://${state.image.croppedPhoto.path}`,
                        height: state.image.croppedPhoto.height,
                        width: state.image.croppedPhoto.width,
                    }}
                />
                <Post
                    imageProps={{
                        src: `file://${state.image.croppedPhoto.path}`,
                        height: state.image.croppedPhoto.height,
                        width: state.image.croppedPhoto.width,
                    }}
                />
                <Post
                    imageProps={{
                        src: `file://${state.image.croppedPhoto.path}`,
                        height: state.image.croppedPhoto.height,
                        width: state.image.croppedPhoto.width,
                    }}
                />
                {/* <Image
                    // source={{ uri: currentPhoto }} // used for blob object url
                    src={`file://${currentPhoto}`}
                    style={{
                        // width: Dimensions.get("window").width,
                        height: Dimensions.get("window").height * 0.8,
                        backgroundColor: "blue",
                        objectFit: "contain",
                    }}
                /> */}
            </ScrollContainer>
        </BaseContainer>
    );
};
