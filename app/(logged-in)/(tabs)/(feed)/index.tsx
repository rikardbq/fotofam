import { BaseContainer } from "@/components/container/BaseContainer";
import { RefreshableScrollContainer } from "@/components/container/RefreshableScrollContainer";
import { Post } from "@/components/post/Post";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import Constants from "expo-constants";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { appID } from "@/fotofamExtra.json";
import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";
const statusBarHeight = Constants.statusBarHeight;

export default (props: any) => {
    const insets = useSafeAreaInsets();
    const { store, theme, colorScheme, setColorScheme } =
        useContext(AppContext);
    const [state, dispatch] = store;
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(
                    `http://192.168.0.22:8082/posts/${state.user.username}?limit=10&offset=0`,
                    {
                        headers: {
                            "x-api-key": "api_123_key",
                            origin: appID,
                            authorization: `Bearer ${state.user.auth_t}`,
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                    }
                );

                setPosts(data);
            } catch (error: any) {
                console.log(error);
            }
        })();
    }, []);

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
                {/* {Object.values(images).map((img: any) => (
                    <Post
                        key={img.name}
                        imageProps={{
                            src: `file://${img.base64}`,
                            height: img.height,
                            width: img.width,
                        }}
                        description={img.name}
                    />
                ))} */}
                {posts.map((post: any) => {
                    console.log(post.image_name);
                    return (
                        <Post
                            key={post.image_name}
                            post={post}
                            description={post.description}
                        />
                    );
                })}
                {/* <Post
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
                /> */}
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
