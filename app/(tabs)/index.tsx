import { AppContext } from "@/context/AppContext";
import { useContext, useEffect, useState } from "react";
import { Button, Image, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { useImageService } from "@/hooks/useService";

export default function Index(props: any) {
    console.log(props);
    const { useStore } = useContext(AppContext);
    const [state, dispatch] = useStore();
    const imageService = useImageService([state, dispatch]);
    const {
        image: { currentPhoto },
    } = state;

    useEffect(() => {
        console.log(currentPhoto);
        console.log("after currentphoto change ", imageService);
    }, [imageService]);

    const [tex, setTex] = useState("");

    // const getData = () => {
    //     services.imageService.getAllImages();
    //     axios
    //         .get("http://192.168.0.22:8081/greeting", {
    //             headers: { "Content-Type": "application/json", "Accept": "application/json" }
    //         })
    //         .then((a) => {
    //             console.log("hello");
    //             console.log(a.status);
    //             setTex(JSON.stringify(a.data));
    //         })
    //         .catch((e) => console.log(JSON.stringify(e)));
    // };

    // console.log(tex);

    return (
        <>
            <Image
                src={`file://${currentPhoto}`}
                style={{ width: "100%", height: "60%", objectFit: "contain" }}
            />
            <Button title="hello" onPress={() => setTex("asdasdasd")} />
            <Image
                src={`file://${imageService.image.currentPhoto}`}
                style={{ width: "100%", height: "60%", objectFit: "contain" }}
            />
            <Text>{tex}</Text>
            {/* <View
            style={{
                flex: 1,
                // justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text>Edit app/index.tsx to edit this screen.</Text>
        </View> */}
        </>
    );
}
