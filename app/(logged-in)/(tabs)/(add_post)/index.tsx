import {
    MutableRefObject,
    useContext,
    useEffect,
    useMemo,
    useReducer,
    useRef,
    useState,
} from "react";
import {
    Button,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {
    Camera,
    Templates,
    useCameraDevice,
    useCameraFormat,
    useCameraPermission,
    useMicrophonePermission,
} from "react-native-vision-camera";
import { AppContext } from "@/context/AppContext";
import { post } from "@/api";
import axios from "axios";
import { openCropper } from "react-native-image-crop-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FA5ICONS from "@expo/vector-icons/FontAwesome5";
import { BaseContainer } from "@/components/container/BaseContainer";
import { ScrollContainer } from "@/components/container/ScrollContainer";
import * as MediaLibrary from "expo-media-library";
import { useDoubleTap } from "@/hooks/useDoubleTap";
import { useNavigation } from "@/hooks/useNavigation";

export default function CameraTab() {
    const [, forceUpdate] = useReducer((x) => !x, false);
    const [offsetY, setOffsetY] = useState(0);
    const imageRefs: MutableRefObject<any[]> = useRef([]);
    const inViewMap: MutableRefObject<any> = useRef({});
    const itemsMap: MutableRefObject<any> = useRef({});
    const [frameHeight, setFrameHeight] = useState(0);
    const [contentHeight, setContentHeight] = useState(0);
    const [albums, setAlbums] = useState<MediaLibrary.Album[]>([]);
    const [photos, setPhotos] = useState<
        (MediaLibrary.Asset & { hidden?: boolean })[]
    >([]);
    const [photosInViewSnapshot, setPhotosInViewSnapshot] = useState<any>({});
    let photosMemo = useMemo<MediaLibrary.Asset[]>(
        () => photos,
        [inViewMap.current]
    );
    const [photosCursor, setPhotosCursor] = useState("");
    const [permissionResponse, requestPermission] =
        MediaLibrary.usePermissions();
    const insets = useSafeAreaInsets();
    const camera = useRef<Camera>(null);
    const device = useCameraDevice("back");
    const screenAspectRatio =
        Dimensions.get("window").height / Dimensions.get("window").width;
    const format = useCameraFormat(device, [
        {
            photoAspectRatio: screenAspectRatio,
        },
        { photoResolution: { width: 1920, height: 1080 } },
    ]);
    const {
        hasPermission: hasCamPermission,
        requestPermission: requestCamPermission,
    } = useCameraPermission();
    const {
        hasPermission: hasMicPermission,
        requestPermission: requestMicPermission,
    } = useMicrophonePermission();
    const [isInit, setInit] = useState(false);
    const { store } = useContext(AppContext);
    const [state, dispatch] = store;
    const { isDoubleTap, doubleTapHandler } = useDoubleTap();
    // const [photos, getPhotos] = useCameraRoll();
    const [showCamera, setShowCamera] = useState(false);
    const navigation = useNavigation();

    const getAlbum = async (title: string) => {
        if (permissionResponse?.status !== "granted") {
            await requestPermission();
        }
        const assets = await MediaLibrary.getAssetsAsync({
            first: 40,
            mediaType: "photo",
            sortBy: "modificationTime",
        });
        setPhotosCursor(assets.endCursor);
        // photosMemo = assets.assets;
        setPhotos(assets.assets);
    };
    async function getAlbums() {
        if (permissionResponse?.status !== "granted") {
            await requestPermission();
        }
        const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
            includeSmartAlbums: true,
        });
        setAlbums(fetchedAlbums);
    }

    useEffect(() => {
        getAlbum("Camera");
    }, []);

    // useEffect(() => {
    //     const currPhoto = state.image.currentPhoto;
    //     const dimension = currPhoto.height > 1080 ? 1080 : currPhoto.height;

    //     console.log("asdasd");

    //     if (currPhoto.path !== "none") {
    //         openCropper({
    //             path: `file://${currPhoto.path}`,
    //             mediaType: "photo",
    //             width: dimension,
    //             height: dimension,
    //             compressImageQuality: 0.8,
    //         }).then((image) => {
    //             dispatch({
    //                 type: "SET_CROPPED_PHOTO",
    //                 data: {
    //                     value: {
    //                         path: image?.path,
    //                         width: image?.width,
    //                         height: image?.height,
    //                     },
    //                 },
    //             });
    //         });
    //     }
    // }, [state.image.currentPhoto]);

    if (!hasCamPermission) requestCamPermission();
    if (!hasMicPermission) requestMicPermission();
    if (device == null) return <View>ERROR</View>;

    const styles = StyleSheet.create({
        scroll_container: {
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "flex-start",
            gap: 4,
            paddingLeft: 0,
            paddingRight: 0,
        },
    });

    const checkInView = (id: string, idx: number) => {
        const rect =
            imageRefs && imageRefs.current[idx].el.getBoundingClientRect();
        console.log(rect);

        // setInViewMap({
        //     ...inViewMap,
        //     [id]: rect.top < window.innerHeight && rect.bottom >= 0,
        // });
    };

    useEffect(() => {
        console.log("changed");
    }, [inViewMap.current]);

    // TODO
    // add a complete camera screen to make navigation to and from camera better and also to make the camera layout and ui design live in 1 place as one screen.
    return (
        <BaseContainer>
            <Image
                // fadeDuration={0}
                // src={`file://${state.image.currentPhoto.path}`}
                source={{ uri: state.image.currentPhoto.path }}
                style={{
                    aspectRatio: 1 / 1,
                    width: Dimensions.get("window").width,
                    resizeMode: "contain",
                }}
            />
            <ScrollContainer
                style={styles.scroll_container}
                onLayout={(e) => {
                    const h = e.nativeEvent.layout.height;
                    setFrameHeight(h);

                    // const maxOffset = contentHeight - h;
                    // console.log("onLayout max offset = ", maxOffset);

                    //     if (maxOffset < this.yOffset) {
                    //       this.yOffset = maxOffset;
                    //     }
                }}
                onContentSizeChange={(w, h) => {
                    setContentHeight(h);
                    const maxOffset = h - frameHeight;
                    console.log("onContentSizeChange max offset = ", maxOffset);
                    // if (maxOffset < this.yOffset) {
                    //   this.yOffset = maxOffset;
                    // }
                }}
                onScroll={(e) => {
                    const offsetY = e.nativeEvent.contentOffset.y;
                    const extraMargin = frameHeight * 2;

                    Object.entries(itemsMap.current).forEach(
                        ([k, { h, y }]: [k: string, v: any]) => {
                            inViewMap.current[k] =
                                y + h + extraMargin < offsetY ||
                                offsetY + extraMargin < y;
                        }
                    );
                    forceUpdate();

                    if (offsetY + 300 > contentHeight - frameHeight) {
                        MediaLibrary.getAssetsAsync({
                            first: 40,
                            after: photosCursor,
                            mediaType: "photo",
                            sortBy: "modificationTime",
                        }).then((assets) => {
                            setPhotosCursor(assets.endCursor);
                            // photosMemo = [...photos, ...assets.assets];
                            setPhotos([...photos, ...assets.assets]);
                        });
                    }
                }}
                onScrollEndDrag={(e) => {
                    // console.log(e.nativeEvent.contentOffset.y);
                    // console.log(inViewMap);
                }}
                scrollEventThrottle={16}
            >
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("camera");
                    }}
                    style={{
                        flex: 1,
                        backgroundColor: "red",
                    }}
                >
                    <FA5ICONS
                        name="plus-square"
                        size={(Dimensions.get("window").width - 8) / 3}
                        color="white"
                    />
                </TouchableOpacity>
                {(photos?.length ?? 0) > 0 &&
                    photos?.map((p, idx: number) => {
                        return inViewMap.current[p.id] ? (
                            <View
                                key={p.id}
                                style={{
                                    backgroundColor: "#242424",
                                    height: 117,
                                    width:
                                        (Dimensions.get("window").width - 8) /
                                        3,
                                }}
                            ></View>
                        ) : (
                            <TouchableOpacity
                                onLayout={(e) => {
                                    itemsMap.current[p.id] = {
                                        y:
                                            e.nativeEvent.layout.y -
                                            (insets.top + 6),
                                        h: e.nativeEvent.layout.height,
                                    };
                                }}
                                key={p.id}
                                onPress={() => {
                                    dispatch({
                                        type: "SET_CURRENT_PHOTO",
                                        data: {
                                            values: {
                                                path: p.uri,
                                                width: p.width,
                                                height: p.height,
                                            },
                                        },
                                    });
                                }}
                            >
                                <Image
                                    source={{ uri: p.uri }}
                                    resizeMethod="resize"
                                    // fadeDuration={1}
                                    style={{
                                        backgroundColor: "#242424",
                                        // display: idx > 40 ? "none" : "flex",
                                        aspectRatio: 1 / 1,
                                        width:
                                            (Dimensions.get("window").width -
                                                8) /
                                            3,
                                        resizeMode: "cover",
                                    }}
                                />
                            </TouchableOpacity>
                        );
                    })}
            </ScrollContainer>
        </BaseContainer>
    );
}
