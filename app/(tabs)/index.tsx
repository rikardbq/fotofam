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
const statusBarHeight = Constants.statusBarHeight;

export default function Index(props: any) {
    const insets = useSafeAreaInsets();
    const { useStore } = useContext(AppContext);
    const [state, dispatch] = useStore();

    const {
        image: { currentPhoto, croppedPhoto },
    } = state;

    useEffect(() => {
        console.log("wasup", currentPhoto);
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
            <ScrollContainer>
                <Post
                    imageProps={{
                        src: `file://${croppedPhoto.path}`,
                        height: croppedPhoto.height,
                        width: croppedPhoto.width,
                    }}
                />
                <Post
                    imageProps={{
                        src: `file://${croppedPhoto.path}`,
                        height: croppedPhoto.height,
                        width: croppedPhoto.width,
                    }}
                />
                <Post
                    imageProps={{
                        src: `file://${croppedPhoto.path}`,
                        height: croppedPhoto.height,
                        width: croppedPhoto.width,
                    }}
                />
                <Post
                    imageProps={{
                        src: `file://${croppedPhoto.path}`,
                        height: croppedPhoto.height,
                        width: croppedPhoto.width,
                    }}
                />
                <Post
                    imageProps={{
                        src: `file://${croppedPhoto.path}`,
                        height: croppedPhoto.height,
                        width: croppedPhoto.width,
                    }}
                />
                <Post
                    imageProps={{
                        src: `file://${croppedPhoto.path}`,
                        height: croppedPhoto.height,
                        width: croppedPhoto.width,
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
}
