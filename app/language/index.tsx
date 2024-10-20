import { Colors } from "@/constants/Colors";
import { ScrollView, Text } from "react-native";


export default function Language() {
    return (
        <>
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ flex: 1, backgroundColor: Colors.current.background, paddingHorizontal: 16 }}>
                <Text style={{ color: Colors.current.text }}>Language</Text>
            </ScrollView>
        </>
    )
}

