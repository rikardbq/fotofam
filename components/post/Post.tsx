import { AppContext } from "@/context/AppContext";
import { CACHE } from "@/util/constants";
import { PADDINGS } from "@/util/globalStyles";
import { useContext, useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Spinner from "../loading/Spinner";
import ThemedHeading from "../typography/theme/ThemedHeading";

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
        paddingTop: PADDINGS.lg,
        paddingBottom: PADDINGS.lg,
        paddingLeft: PADDINGS.md,
        paddingRight: PADDINGS.md,
        // backgroundColor: "#242424", //"green",
        // color: "#fff"
    },
    footer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        paddingTop: PADDINGS.lg,
        paddingBottom: PADDINGS.lg,
        paddingLeft: PADDINGS.md,
        paddingRight: PADDINGS.md,
        // backgroundColor: "#242424", //"red"
    },
    footerText: {
        color: "#ffffff",
    },
});

type PostProps = {
    post: any;
    description?: string;
};

// const screenAspectRatio = Dimensions.get("window").height / Dimensions.get("window").width;

export const Post = ({ post, description }: PostProps) => {
    const { store, postService, cache } = useContext(AppContext);
    const [state, _] = store;
    const [image, setImage] = useState<any>({});

    useEffect(() => {
        (async () => {
            const getImageStatement = await cache.prepareAsync(
                CACHE.STATEMENTS.GET.IMAGE
            );
            const insertImageStatement = await cache.prepareAsync(
                CACHE.STATEMENTS.INSERT.IMAGE
            );

            const data = await postService.getImageByName(post.image_name, {
                get: getImageStatement,
                insert: insertImageStatement,
            });

            setImage(data);
        })();
    }, []);

    return (
        <View style={styles.container}>
            <Header style={styles.header} name={state.user.realName ?? ""} />
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
    name: string;
};

const Header = ({ style, name }: HeaderProps) => {
    return (
        <View style={style}>
            {/* <Image {...imageProps} /> */}
            <ThemedHeading size="sm">{name}</ThemedHeading>
        </View>
    );
};

type FooterProps = {
    description?: string;
};

const Footer = ({ description }: FooterProps) => {
    return (
        <View style={styles.footer}>
            {description && (
                <Text style={styles.footerText}>{description}</Text>
            )}
        </View>
    );
};
