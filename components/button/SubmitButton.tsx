import { Colors } from "@/constants/Colors";
import { Pressable, Text, View } from "react-native";


interface SubmitButtonProps {
    title: string;
    onPress: () => void;
}


export default function SubmitButton({ title, onPress }: SubmitButtonProps) {
    return (
        <>
            <Pressable onPress={onPress}>
                <View
                    style={{
                        backgroundColor: Colors.current.tint,
                        paddingVertical: 16,
                        paddingHorizontal: 32,
                        borderRadius: 16,
                    }}
                >
                    <Text style={{ color: Colors.current.text, fontFamily: 'LemonMilk-Bold', fontSize: 14, textAlign: 'center' }}>
                        {title}
                    </Text>
                </View>
            </Pressable>
        </>
    )
}



