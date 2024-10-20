import { Colors } from "@/constants/Colors";
import { textShorterFunction } from "@/utils/textShorter";
import { Image } from "expo-image";
import { Text, View } from "react-native";


interface CheckboxTabWithIconProps {
    iconSrc: string;
    title: string;
    selected: boolean;
}


export default function CheckboxTabWithIcon({ iconSrc, title, selected }: CheckboxTabWithIconProps) {
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
                    <Image source={iconSrc} style={{ width: 40, height: 40, borderRadius: 20 }} contentFit="cover" />
                    <Text style={{ color: 'white', fontSize: 16, fontFamily: "EulidCircular-Regular" }}>
                        {textShorterFunction(title, 20)}
                    </Text>
                </View>
                {
                    selected ?
                        <>
                            <View
                                style={{
                                    position: 'absolute',
                                    right: 20
                                }}
                            >
                                <Image source={require('@/assets/images/icons/check.svg')} style={{ width: 15, height: 12, tintColor: Colors.current.tint }} />
                            </View>
                        </>
                        :
                        <></>
                }
            </View>
        </>
    )
}



