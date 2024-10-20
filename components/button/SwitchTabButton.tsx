import { Colors } from "@/constants/Colors";
import { Switch, Text, View } from "react-native";

interface SwitchTabButtonProps {
    title: string;
    value: boolean;
    onPress: () => void;
}


export default function SwitchTabButton({ title, value, onPress }: SwitchTabButtonProps) {
    return (
        <>
            <View
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center", width: '100%' }}
            >
                <View
                    style={{
                        width: '100%',
                        paddingHorizontal: 16,
                        paddingVertical: 20,
                        borderRadius: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: Colors.current.tabBackground,
                        gap: 16
                    }}
                >
                    <Text style={{ color: 'white', fontSize: 16, fontFamily: "EulidCircular-Regular" }}>
                        {title}
                    </Text>
                </View>
                <View
                    style={{
                        position: 'absolute',
                        right: 16
                    }}
                >
                    <Switch
                        trackColor={{ false: "gray", true: Colors.current.tint }}
                        thumbColor={Colors.current.text}
                        onValueChange={onPress}
                        value={value}
                    />
                </View>
            </View>
        </>
    )
}



