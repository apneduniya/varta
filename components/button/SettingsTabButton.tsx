import { Colors } from "@/constants/Colors";
import { Image } from "expo-image";
import { Href, router } from "expo-router";
import { Pressable, Text, View } from "react-native";


interface SettingsNavButtonProps {
    route: Href<string | object>;
    iconSrc: string;
    title: string;
    iconWidth?: number;
    iconHeight?: number;
}

export default function SettingsNavButton({ route, iconSrc, title, iconWidth = 24, iconHeight = 24 }: SettingsNavButtonProps) {
    return (
        <>
            <Pressable
                onPress={() => {
                    router.navigate(route);
                }}
            >
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
                        <Image source={iconSrc} style={{ width: iconWidth, height: iconHeight, tintColor: Colors.current.tint }} />
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
                        <Image source={require('@/assets/images/icons/chevron_right.svg')} style={{ width: 9, height: 16, tintColor: 'gray' }} />
                    </View>
                </View>
            </Pressable>
        </>
    )
}


