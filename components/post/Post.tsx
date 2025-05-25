import globalStyles, { PADDINGS } from "@/util/globalStyles";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import ThemedHeading from "../typography/theme/ThemedHeading";
import Spinner from "../loading/Spinner";
import { useContext, useEffect, useState } from "react";
import { appID } from "@/fotofamExtra.json";
import axios from "axios";
import { AppContext } from "@/context/AppContext";

const styles = StyleSheet.create({
    spinner: {
        alignItems: "center",
        justifyContent: "center",
        width: Dimensions.get("window").width,
        aspectRatio: 1 / 1,
    },
    container: {
        flex: 1,
        // height: 400,
        backgroundColor: "#000000",
        // borderRadius: 10,
        overflow: "hidden",
    },
    header: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: PADDINGS.xl,
        // backgroundColor: "#242424", //"green",
        // color: "#fff"
    },
    footer: {
        paddingTop: PADDINGS.lg,
        paddingBottom: PADDINGS.lg,
        paddingLeft: PADDINGS.sm,
        paddingRight: PADDINGS.sm,
        // backgroundColor: "#242424", //"red"
        color: "#fff",
    },
});

type PostProps = {
    post: any;
    description?: string;
};

// const screenAspectRatio = Dimensions.get("window").height / Dimensions.get("window").width;

export const Post = ({ post, description }: PostProps) => {
    const { store } = useContext(AppContext);
    const [state, dispatch] = store;
    const [image, setImage] = useState<any>({});

    useEffect(() => {
        (async () => {
            const { data } = await axios.get(
                `http://192.168.0.22:8082/images/${post.image_name}`,
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

            console.log("resolve -> ", data.name);
            

            setImage(data);
        })();
    }, []);

    return (
        <View style={styles.container}>
            <Header style={styles.header} username="rikardbq" />
            {!image.base64 ? (
                <View style={styles.spinner}>
                    <Spinner />
                </View>
            ) : (
                <Image
                    source={{ uri: image.base64 }}
                    // src={imageProps.src}
                    style={{
                        // width: Dimensions.get("window").width,
                        // height: imageProps.height,
                        // maxHeight: Dimensions.get("window").height * 0.75,
                        aspectRatio: 1 / 1, //(imageProps.height && imageProps.width) ? imageProps.height / imageProps.width : 1/1,
                        // aspectRatio: Dimensions.get("window").height * 0.75 / Dimensions.get("window").width,
                        backgroundColor: "#2222ff",
                        resizeMode: "contain",
                        objectFit: "contain", // should be "contain" but use cover for now to emulate the look of 1:1 aspect ratio picture
                    }}
                />
            )}
            {/* <Footer description="some text here to describe the photo, and then some more stuff to describe it like wtf is this text? some text here to describe the photo, and then some more stuff to describe it like wtf is this text? sdsdasdsd dsad dasdasd asdas dasd asd asd asd asd sss" /> */}
            <Footer
                description={
                    description ?? "some text here to describe the photo"
                }
            />
        </View>
    );
};

type HeaderProps = {
    style: typeof styles.header;
    username: string;
};

const Header = ({ style, username }: HeaderProps) => {
    return (
        <View style={style}>
            {/* <Image {...imageProps} /> */}
            <ThemedHeading size="sm">@{username}</ThemedHeading>
        </View>
    );
};

type FooterProps = {
    description?: string;
};

const Footer = ({ description }: FooterProps) => {
    return (
        <View style={styles.footer}>
            {description && <Text style={styles.footer}>{description}</Text>}
        </View>
    );
};
