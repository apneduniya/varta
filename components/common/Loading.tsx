import { Colors } from "@/constants/Colors";
import { Text, View } from "react-native";


export default function Loading() {
    return (
        <>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: Colors.current.background,
                }}>
                    <Text style={{ color: Colors.current.text, fontFamily: "NeueMachina-UltraBold", fontSize: 18 }}>Loading...</Text>
            </View>
        </>
    );
}




