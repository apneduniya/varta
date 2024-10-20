import Loading from "@/components/common/Loading";
import NewsBox from "@/components/common/NewsBox";
import { Colors } from "@/constants/Colors";
import { setItem } from "@/utils/AsyncStorage";
import { getBookmarksFunction } from "@/utils/bookmark";
import { CURRENT_NEWS_DATA } from "@/utils/constants";
import { NewsListDataObject } from "@/utils/types";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";


export default function Bookmark() {
    const [newsList, setNewsList] = useState<NewsListDataObject[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useFocusEffect(
        useCallback(() => {
            let isActive = true;

            async function fetchNewsList() {
                setLoading(true);

                const newsData = await getBookmarksFunction();
                if (isActive) {
                    console.log("List", newsData);
                    setNewsList(newsData);
                    setLoading(false);
                }
            }

            fetchNewsList();

            return () => {
                isActive = false;
                setNewsList([]); // Clear the list when the screen is unfocused
            };
        }, [])
    );

    const handleNavigateToNewsPage = async (item: NewsListDataObject) => {
        await setItem(CURRENT_NEWS_DATA, item)

        router.navigate("/news");
    }

    return (
        <>

            {
                loading ? (
                    <Loading />
                ) : (
                    newsList.length > 0 ? (
                        <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ flex: 1, backgroundColor: Colors.current.background, paddingHorizontal: 16 }}>
                            {
                                newsList.map((item, index) => (
                                    <View key={index}>
                                        <Pressable onPress={() => handleNavigateToNewsPage(item)}>
                                            <NewsBox data={item} />
                                        </Pressable>
                                    </View>
                                ))
                            }
                        </ScrollView>
                    ) : (
                        <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: Colors.current.background,
                        }}>
                            <Text style={{ color: Colors.current.text, fontFamily: "NeueMachina-UltraBold", fontSize: 18 }}>
                                No bookmarked news found
                            </Text>
                    </View>
                    )
                )
            }
        </>
    )
}


