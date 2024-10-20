import { Colors } from "@/constants/Colors";
import { textShorterFunction } from "@/utils/textShorter";
import { Image } from "expo-image";
import { Text, View } from "react-native";


interface CheckboxTabProps {
    title: string;
    selected: boolean;
}


export default function CheckboxTab({ title, selected }: CheckboxTabProps) {
    return (
        <>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: "flex-start",
                    width: '100%',
                    paddingHorizontal: 16,
                    paddingVertical: 20,
                    borderRadius: 20,
                    backgroundColor: Colors.current.tabBackground,
                }}
            >
                <Text style={{ color: 'white', fontSize: 16, fontFamily: "EulidCircular-Regular" }}>
                    {textShorterFunction(title, 30)}
                </Text>
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



