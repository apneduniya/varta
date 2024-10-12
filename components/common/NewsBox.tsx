import { Colors } from "@/constants/Colors";
import { Text, View } from "react-native";
import Badge from "./Badge";
import { NewsDataObject } from "@/utils/types";
import { textShorterFunction } from "@/utils/textShorter";
import { timeDistanceFunction } from "@/utils/timeDistance";


interface NewsBoxProps {
    color?: string;
    data: NewsDataObject;
}

export default function NewsBox({ color = "", data }: NewsBoxProps) {
    const badgeColor = "#373737";

    return (
        <>
            <View
                style={{
                    borderRadius: 16,
                    backgroundColor: 'transparent',
                    marginBottom: 24,

                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    
                    elevation: 5,
                }}
            >
                <View
                    style={{
                        width: '100%',
                        paddingVertical: 16,
                        paddingHorizontal: 16,
                        backgroundColor: color ? color : Colors.current.tint,
                        borderRadius: 8,
                    }}>
                    <Badge color={badgeColor} text={data?.source || "Unknown Source"} />
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 8 }}>
                        {textShorterFunction(data?.title) || "Unknown Title"}
                    </Text>
                    <Text style={{ fontSize: 14, color: 'gray', marginTop: 8 }}>
                        {timeDistanceFunction(data?.publish_date) || "Unknown Date"}
                    </Text>
                </View>
            </View>
        </>
    );
}
