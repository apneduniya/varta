import { Colors } from "@/constants/Colors";
import { Text, View } from "react-native";
import Badge from "./Badge";
import { NewsListDataObject } from "@/utils/types";
import { textShorterFunction } from "@/utils/textShorter";
import { timeDistanceFunction } from "@/utils/timeDistance";
import { randomNewsOutletTextColorFunction } from "@/utils/randomColor";
import { Image } from "expo-image";


interface NewsBoxProps {
    color?: string;
    data: NewsListDataObject;
}

export default function NewsBox({ data }: NewsBoxProps) {
    const badgeColor = "#373737";

    return (
        <>
            <View
                style={{
                    // borderRadius: 16,
                    backgroundColor: 'transparent',
                    marginBottom: 20,

                    // shadowColor: '#000',
                    // shadowOffset: {
                    //     width: 0,
                    //     height: 2,
                    // },
                    // shadowOpacity: 0.25,
                    // shadowRadius: 3.84,

                    // elevation: 5,
                }}
            >
                <View
                    style={{
                        width: '100%',
                        paddingVertical: 16,
                        // paddingHorizontal: 16,
                        flexDirection: "row",
                        gap: 28,
                    }}>
                    <View>
                        <Image
                            source={{ uri: data?.preview_image }}
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: 8,
                            }}
                            contentFit="cover"
                            transition={1000}
                        />
                    </View>
                    {/* Text Container */}
                    <View style={{ flex: 1 }}>
                        <View
                            style={{
                                flexDirection: "row",
                            }}
                        >
                            <Text style={{ fontSize: 12, color: randomNewsOutletTextColorFunction() }}>
                                {data?.source || "Unknown Source"}
                            </Text>
                            <Text style={{ fontSize: 12, color: 'gray', fontFamily: "VelaSans-Light" }}>
                                {` • ${timeDistanceFunction(data?.publish_date) || "Unknown Date"}`}
                            </Text>
                        </View>
                        <Text style={{ fontSize: 16, fontWeight: 'heavy', marginTop: 8, fontFamily: "LemonMilk-Bold", color: Colors.current.text }}>
                            {textShorterFunction(data?.title) || "Unknown Title"}
                        </Text>
                    </View>
                </View>
            </View>
        </>
    );
}
