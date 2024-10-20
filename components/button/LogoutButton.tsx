import { Colors } from "@/constants/Colors";
import { removeItem } from "@/utils/AsyncStorage";
import { REFRESH_TOKEN } from "@/utils/constants";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";


export default function LogoutButton() {

    const handlePress = async () => {
        await removeItem(REFRESH_TOKEN);

        router.navigate("/login");
    }

    return (
        <>
            <Pressable
                onPress={handlePress}
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
                        <Image source={require('@/assets/images/icons/logout.svg')} style={{ width: 18, height: 18, tintColor: "red" }} />
                        <Text style={{ color: 'red', fontSize: 16, fontFamily: "EulidCircular-Regular" }}>
                            Logout
                        </Text>
                    </View>
                </View>
            </Pressable>
        </>
    )
}



