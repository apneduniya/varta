import { Colors } from "@/constants/Colors";
import { Text, View } from "react-native";


interface BadgeProps {
    color?: string;
    text: string;
}

export default function Badge({ color = "", text }: BadgeProps) {

    return (
        <>
            <View
                style={{
                    alignSelf: 'flex-start',
                    paddingVertical: 4,
                    paddingHorizontal: 8,
                    backgroundColor: color ? color : Colors.currentReverse.background,
                    borderRadius: 6,
                }}>
                <Text style={{ color: Colors.current.badgeBgColor }}>
                    {text}
                </Text>
            </View>
        </>
    );
}
