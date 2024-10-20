import { Colors } from "@/constants/Colors";
import { Text, View } from "react-native";


interface OutlineButtonProps {
    title: string;
    isSelected?: boolean;
}


export default function OutlineButton({ title, isSelected = false }: OutlineButtonProps) {
    return (
        <>
            <View
                style={{
                    alignSelf: 'flex-start',
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 10,
                    borderColor: isSelected ? Colors.current.tint : 'gray',
                    borderWidth: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <Text style={{ color: isSelected ? Colors.current.tint : 'gray', fontSize: 14, fontFamily: "EulidCircular-Regular" }}>
                    {title}
                </Text>
            </View>
        </>
    )
}



