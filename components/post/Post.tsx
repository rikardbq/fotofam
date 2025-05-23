import globalStyles, { PADDINGS } from "@/util/globalStyles";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import ThemedHeading from "../typography/theme/ThemedHeading";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // height: 400,
        backgroundColor: "orange",
        // borderRadius: 10,
        overflow: "hidden",
    },
    header: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: PADDINGS.xl,
        backgroundColor: "#242424", //"green",
        // color: "#fff"
    },
    footer: {
        paddingTop: PADDINGS.lg,
        paddingBottom: PADDINGS.lg,
        paddingLeft: PADDINGS.sm,
        paddingRight: PADDINGS.sm,
        backgroundColor: "#242424", //"red"
        color: "#fff",
    },
});

type PostProps = {
    imageProps: {
        width?: number;
        height?: number;
        src: string;
    };
};

// const screenAspectRatio = Dimensions.get("window").height / Dimensions.get("window").width;

export const Post = ({ imageProps }: PostProps) => {
    return (
        <View style={styles.container}>
            <Header style={styles.header} username="rikardbq" imageProps={{}} />
            <Image
                src={imageProps.src}
                style={{
                    // width: Dimensions.get("window").width,
                    // height: imageProps.height,
                    // maxHeight: Dimensions.get("window").height * 0.75,
                    aspectRatio: 1 / 1, //(imageProps.height && imageProps.width) ? imageProps.height / imageProps.width : 1/1,
                    // aspectRatio: Dimensions.get("window").height * 0.75 / Dimensions.get("window").width,
                    backgroundColor: "blue",
                    resizeMode: "contain",
                    objectFit: "contain", // should be "contain" but use cover for now to emulate the look of 1:1 aspect ratio picture
                }}
            />
            {/* <Footer description="some text here to describe the photo, and then some more stuff to describe it like wtf is this text? some text here to describe the photo, and then some more stuff to describe it like wtf is this text? sdsdasdsd dsad dasdasd asdas dasd asd asd asd asd sss" /> */}
            <Footer description="some text here to describe the photo" />
        </View>
    );
};

type HeaderProps = {
    style: typeof styles.header;
    username: string;
    imageProps: any;
};

const Header = ({ style, username, imageProps }: HeaderProps) => {
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
