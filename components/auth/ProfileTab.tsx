import { Colors } from "@/constants/Colors";
import { Image } from "expo-image";
import { Href, router } from "expo-router";
import { Pressable, Text, View } from "react-native";


interface ProfileTabProps {
    email: string;
    name: string;
}

export default function ProfileTab({ email, name }: ProfileTabProps) {
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
                    <Image source={require('@/assets/images/icons/user.svg')} style={{ width: 18, height: 20, tintColor: Colors.current.tint }} />
                    <View
                        style={{
                            flexDirection: 'column',
                            gap: 2
                        }}
                    >
                        <Text style={{ color: 'gray', fontSize: 14, fontFamily: "EulidCircular-Regular" }}>
                            {email}
                        </Text>
                        <Text style={{ color: 'white', fontSize: 16, fontFamily: "EulidCircular-Regular" }}>
                            {name}
                        </Text>
                    </View>
                </View>
            </View>
        </>
    )
}


