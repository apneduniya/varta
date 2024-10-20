import BookmarkButton from "@/components/button/BookmarkButton";
import Loading from "@/components/common/Loading";
import ReadFullArticleButton from "@/components/button/ReadFullArticleButton";
import { Colors } from "@/constants/Colors";
import { getNewsDataAPI } from "@/service/news/getNewsData";
import { getItem } from "@/utils/AsyncStorage";
import { CURRENT_NEWS_DATA } from "@/utils/constants";
import { randomNewsOutletTextColorFunction } from "@/utils/randomColor";
import { timeDistanceFunction } from "@/utils/timeDistance";
import { NewsListDataObject } from "@/utils/types";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { Dimensions } from 'react-native';
import { Button, Linking, Pressable, ScrollView, Text, View } from "react-native";
import Markdown from 'react-native-markdown-display';


export default function News() {
    const [loading, setLoading] = useState<boolean>(false);
    const [newsData, setNewsData] = useState<NewsListDataObject>();
    const [summary, setSummary] = useState<string>("");

    const win = Dimensions.get('window');
    const ratio = win.width / 600; //600 is actual image width (assumed)
    const badgeColor = "#373737";

    useEffect(() => {

        async function getCurrentNewsData() {
            setLoading(true);

            const data = await getItem(CURRENT_NEWS_DATA);
            setNewsData(data);

            setLoading(false);
        }

        getCurrentNewsData()

    }, []);

    useEffect(() => {
        async function getNewsSummary() {
            setLoading(true);

            if (newsData?.link) {
                const data = await getNewsDataAPI(newsData.link);
                setSummary(data.summary)
            }

            setLoading(false);
        }

        getNewsSummary();

    }, [newsData])

    const handleOpenLink = (link: string) => {
        Linking.openURL(link)
    }

    return (
        <>
            {
                loading ? (
                    <Loading />
                ) : (
                    <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ flex: 1, backgroundColor: Colors.current.background, paddingHorizontal: 16 }}>
                        <Text style={{ fontSize: 24, fontWeight: 'heavy', fontFamily: "LemonMilk-Bold", color: Colors.current.text }}>
                            {newsData?.title}
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                marginTop: 8
                            }}
                        >
                            <Text style={{ fontSize: 12, color: randomNewsOutletTextColorFunction() }}>
                                {newsData?.source || "Unknown Source"}
                            </Text>
                            <Text style={{ fontSize: 12, color: 'gray', fontFamily: "VelaSans-Light" }}>
                                {` • ${timeDistanceFunction(newsData?.publish_date) || "Unknown Date"}`}
                            </Text>
                        </View>
                        <View style={{ marginTop: 16, flexDirection: "row", gap: 16 }} >
                            {newsData && <BookmarkButton newsData={newsData} />}
                            {newsData?.link && <ReadFullArticleButton link={newsData.link} />}
                        </View>
                        <View style={{ marginTop: 8 }}>
                            <Image
                                source={{ uri: newsData?.preview_image }}
                                style={{
                                    width: "100%",
                                    height: 320 * ratio, //320 is actual height of image (assumed)
                                }}
                                contentFit="contain"
                                transition={1000}
                            />
                        </View>
                        <Markdown style={{
                            body: {
                                fontSize: 16, color: Colors.current.text, marginTop: 16, fontFamily: "EulidCircular-Regular", backgroundColor: Colors.current.background
                            },
                            code_inline: {
                                backgroundColor: "#24292E",
                            },
                            code_block: {
                                backgroundColor: "#24292E",
                            },
                            blockquote: {
                                backgroundColor: "#24292E",
                            }
                        }}>
                            {summary}
                        </Markdown>
                        {/* <View
                            style={{
                                width: "80%",
                                height: 1,
                                backgroundColor: "#8C9298",
                                marginVertical: 32,
                                alignSelf: "center"
                            }}
                        ></View> */}
                        {/* <View style={{ marginBottom: 32 }}>
                            {newsData?.link && (
                                <>
                                    <Text style={{ color: Colors.current.text, fontFamily: "EulidCircular-Regular" }}>
                                        View full article:
                                    </Text>
                                    <Pressable onPress={() => handleOpenLink(newsData.link)}>
                                        <Text style={{ color: Colors.current.text, flexWrap: "wrap", width: "100%", textDecorationLine: "underline", fontFamily: "VelaSans-Light" }}>
                                            {newsData.link}
                                        </Text>
                                    </Pressable>
                                </>
                            )}
                        </View> */}
                    </ScrollView>
                )
            }
        </>
    )
}


