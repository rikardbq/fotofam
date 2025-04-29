import { useContext, useEffect, useRef, useState } from "react";
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
import { useDoubleTap } from "../../hooks/useDoubleTap";
import { AppContext } from "@/context/AppContext";
import { post } from "@/api";
import axios from "axios";
import { openCropper } from "react-native-image-crop-picker";

export default function CameraTab() {
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
    const { isDoubleTap, doubleTapHandler } = useDoubleTap();
    const [isInit, setInit] = useState(false);
    const { useStore } = useContext(AppContext);
    const [state, dispatch] = useStore();

    useEffect(() => {
        if (isInit && isDoubleTap) {
            (async () => {
                const file = await camera.current?.takePhoto();

                console.log("FILE ______> ", file);

                // save metadata as current photo in store state
                // get the blob ready to upload to backend
                // as part of the request send metadata and store in db together with static file slug
                // so the backend can serve the image from the slug name rather than the exact file name on disk

                // OR i save it all as blobs and serve directly from DB, completely not doing any static file server-ish stuff
                const result = await fetch(`file://${file?.path}`);
                const data = await result.blob();

                // const test = new Blob([data.toString()]);
                // console.log(formData);

                const splitFileName = file?.path.split("/");
                const slug = splitFileName![splitFileName!.length - 1];
                // const formData = new FormData();
                // formData.append("image", (await getBase64(data)) as string);
                // formData.append(
                //     "metadata",
                //     JSON.stringify({
                //         name: file?.path,
                //         slug,
                //         width: file?.width,
                //         height: file?.height,
                //     })
                // );
                const start = new Date().getTime();
                const b64_data = (await getBase64(data)) as string;
                // const b = new Blob([b64_data], {
                //     type: "application/octet-stream"
                // });

                // console.log(b64_data.length);
                // await b.bytes()

                // const arrayBuffer = await b.arrayBuffer();
                // const buffer = Buffer.from(arrayBuffer);

                // console.log(arrayBuffer);
                // console.log(buffer);

                // const resp = await postDataMPart(formData);
                const resp = await postData2({
                    imgB64: b64_data,
                    metadata: {
                        name: file?.path,
                        slug,
                        width: file?.width,
                        height: file?.height,
                    },
                });
                const resp2 = await postData(
                    new TextEncoder().encode(b64_data)
                );
                console.log(resp.data);
                console.log(resp2.data);

                // const resp = await postData(b64_data);
                console.log(new Date().getTime() - start);

                // console.log(resp.data);

                // const respBlob = new Blob([resp.data], { type: "image/jpeg" });
                // try {

                //     const b64Blob = await getBase64(respBlob);
                //     // console.log(b64Blob);

                // } catch(e) {
                //     console.log(e);

                // }

                // dispatch({
                //     type: "SET_CURRENT_PHOTO",
                //     data: {
                //         // value: textDecoder.current.decode(
                //         //     new Uint8Array(resp.data)
                //         // ),
                //         value: resp.data,
                //     },
                // });
            })();
        }
    }, [isDoubleTap, isInit]);

    useEffect(() => {
        const currPhoto = state.image.currentPhoto;
        const dimension = currPhoto.height > 1080 ? 1080 : currPhoto.height;

        if (currPhoto.path !== "none") {
            openCropper({
                path: `file://${currPhoto.path}`,
                mediaType: "photo",
                width: dimension,
                height: dimension,
                compressImageQuality: 0.8,
            }).then((image) => {
                dispatch({
                    type: "SET_CROPPED_PHOTO",
                    data: {
                        value: {
                            path: image?.path,
                            width: image?.width,
                            height: image?.height,
                        },
                    },
                });
            });
        }
    }, [state.image.currentPhoto]);

    const postDataMPart = async (data: any) => {
        return await axios.post(
            "http://192.168.0.22:8082/images_multipart",
            data,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                },
                transformRequest: (d) => d,
            }
        );
    };

    const postData2 = async (data: any) => {
        console.log(data.length);

        return await axios.post("http://192.168.0.22:8082/images_2", data, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
    };

    const postData = async (data: any) => {
        console.log(data.length);

        // return await fetch("http://192.168.0.22:8082/images", {
        //     method: "POST",
        //     headers: {
        //       Accept: "application/json",
        //       "Content-Type": "application/octet-stream",
        //     },
        //     body: new TextEncoder().encode(data),
        //   });

        return await axios.post("http://192.168.0.22:8082/images", data, {
            headers: {
                "Content-Type": "application/octet-stream",
                Accept: "application/json",
                // "Content-Length": data.length,
            },
            transformRequest: (d) => d,
        });
    };

    // const postData2 = async (data: any) => {
    //     fetch("http://192.168.0.22:8082/images");
    // };

    const getBase64 = (blob: Blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = (e: any) => reject(new Error(JSON.stringify(e)));
            reader.readAsDataURL(blob);
        });
    };

    useEffect(() => {
        // console.log(state);
    }, [state]);

    if (!hasCamPermission) requestCamPermission();
    if (!hasMicPermission) requestMicPermission();
    if (device == null) return <View>ERROR</View>;

    return (
        <>
            <TouchableOpacity
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: "#e3e3e3",
                    opacity: 0.75,
                    position: "absolute",
                    bottom: 50,
                    alignSelf: "center",
                    zIndex: 999,
                }}
                onPress={async () => {
                    const photo = await camera?.current?.takePhoto();
                    dispatch({
                        type: "SET_CURRENT_PHOTO",
                        data: {
                            value: {
                                path: photo?.path,
                                width: photo?.width,
                                height: photo?.height,
                            },
                        },
                    });
                }}
            />
            <Camera
                onTouchStart={doubleTapHandler}
                ref={camera}
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                photo={true}
                video={true}
                format={format}
                photoQualityBalance="speed"
                onInitialized={() => {
                    setInit(true);
                }}
            />
        </>
    );
}
