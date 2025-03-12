import { useContext, useEffect, useRef, useState } from "react";
import {
    Button,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {
    Camera,
    useCameraDevice,
    useCameraPermission,
    useMicrophonePermission,
} from "react-native-vision-camera";
import { useDoubleTap } from "../../hooks/useDoubleTap";
import { AppContext } from "@/context/AppContext";

export default function CameraTab() {
    const camera = useRef<Camera>(null);
    const device = useCameraDevice("back");
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
                dispatch({
                    type: "SET_CURRENT_PHOTO",
                    data: { value: file?.path },
                });
            })();
        }
    }, [isDoubleTap, isInit]);

    useEffect(() => {
        console.log(state);
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
                onPress={async () =>
                    dispatch({
                        type: "SET_CURRENT_PHOTO",
                        data: {
                            value: (await camera?.current?.takePhoto())?.path,
                        },
                    })
                }
            ></TouchableOpacity>
            <Camera
                onTouchStart={doubleTapHandler}
                ref={camera}
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                photo={true}
                video={true}
                onInitialized={() => {
                    setInit(true);
                }}
            />
        </>
    );
}
