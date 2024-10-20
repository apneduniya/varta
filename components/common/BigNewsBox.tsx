import { Colors } from "@/constants/Colors";
import { Text, View } from "react-native";
import Badge from "./Badge";
import { NewsListDataObject } from "@/utils/types";
import { textShorterFunction } from "@/utils/textShorter";
import { timeDistanceFunction } from "@/utils/timeDistance";
import { randomNewsOutletTextColorFunction } from "@/utils/randomColor";
import { Image } from "expo-image";
import { Dimensions } from 'react-native';


interface NewsBoxProps {
    color?: string;
    data: NewsListDataObject;
}

export default function BigNewsBox({ data }: NewsBoxProps) {
    const win = Dimensions.get('window');
    const ratio = win.width / 600; //600 is actual image width (assumed)
    const badgeColor = "#373737";

    return (
        <>
            <View
                style={{
                    // borderRadius: 16,
                    backgroundColor: 'transparent',

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
                    }}>
                    <View>
                        <Image
                            source={{ uri: data?.preview_image }}
                            style={{
                                width: "100%",
                                height: 320 * ratio, //320 is actual height of image (assumed)
                                borderRadius: 8,
                            }}
                            contentFit="cover"
                            transition={1000}
                        />
                    </View>
                    {/* Text Container */}
                    <View style={{ flex: 1, marginTop: 16 }}>
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
