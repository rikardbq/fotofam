import { Image, Text, View } from "react-native";

export default function Index(props: any) {
    console.log(props);
    
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {/* <Image src={photoPath}></Image> */}
            <Text>Edit app/index.tsx to edit this screen.</Text>
        </View>
    );
}
