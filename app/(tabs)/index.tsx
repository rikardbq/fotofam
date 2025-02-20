import { AppContext } from "@/context/AppContext";
import { useContext } from "react";
import { Image, Text, View } from "react-native";

export default function Index(props: any) {
    console.log(props);

    const { currentPhoto } = useContext(AppContext);

    console.log("asdasdasd", currentPhoto);
    
    
    return (<>
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Image src={`file://${currentPhoto?.path}`} style={{ width: "100%", height: 500 }}/>
            {/* <Image src={photoPath}></Image> */}
            <Text>Edit app/index.tsx to edit this screen.</Text>
        </View>
    </>
    );
}
