import { BaseContainer } from "@/components/container/BaseContainer";
import { RefreshableScrollContainer } from "@/components/container/RefreshableScrollContainer";
import { Post } from "@/components/post/Post";
import { AppContext } from "@/context/AppContext";
import Constants from "expo-constants";
import { useContext, useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const statusBarHeight = Constants.statusBarHeight;

export default (props: any) => {
    const insets = useSafeAreaInsets();
    const { store, theme, colorScheme, setColorScheme } =
        useContext(AppContext);
    const [state, dispatch] = store;

    useEffect(() => {
        console.log("wasup", state);
    }, [state]);

    const testHeight = Dimensions.get("window").height * 0.75;

    const styles = StyleSheet.create({
        test: {
            gap: 12,
        },
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
            {/* <View
                    style={{
                        backgroundColor: theme.colors.BRIGHT_RED,
                        marginTop: 100,
                    }}
                >
                    <TouchableOpacity
                        onPress={() =>
                            setColorScheme(
                                colorScheme === "light" ? "dark" : "light"
                            )
                        }
                    >
                        <Text style={{ color: theme.colors.BRIGHT_YELLOW }}>
                            ASDFFGFFF
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setColorScheme("system")}>
                        <Text style={{ color: theme.colors.BRIGHT_YELLOW }}>
                            use system theme
                        </Text>
                    </TouchableOpacity>
                    <Link
                        href={"/post/123" as any}
                        style={{
                            height: 200,
                            color: theme.colors.BRIGHT_YELLOW,
                        }}
                        withAnchor
                    >
                        Go to post
                    </Link>
                </View> */}

            <RefreshableScrollContainer contentContainerStyle={{ gap: 12 }}>
                {/* <ScrollContainer style={styles.test}> */}
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
                {/* </ScrollContainer> */}
            </RefreshableScrollContainer>
        </BaseContainer>
    );
};
