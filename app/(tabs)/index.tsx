import Loading from "@/components/common/Loading";
import NewsBox from "@/components/common/NewsBox";
import { Colors } from "@/constants/Colors";
import { getNewsListAPI } from "@/service/news/getNewsList";
import { NewsListDataObject } from "@/utils/types";
import { setItem } from "@/utils/AsyncStorage";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { CURRENT_NEWS_DATA } from "@/utils/constants";
import BigNewsBox from "@/components/common/BigNewsBox";
import { areURLsEqualFunction, getIndexOfPreferredSourcesFunction, getPreferredSourcesFunction } from "@/utils/preferredSources";
import { getUserInterestsFunction } from "@/utils/userInterests";


export default function Index() {
    const [loading, setLoading] = useState<boolean>(false);
    const [newsList, setNewsList] = useState<Array<NewsListDataObject>>([]);
    const [preferredSources, setPreferredSources] = useState<string[]>([]);
    const previousPreferredSources = useRef<string[]>([]); // Store the previous preferred sources


    async function fetchNewsList() {
        setLoading(true);
        setNewsList([]); // Clear the list before fetching new data

        const preferred_sources = await getIndexOfPreferredSourcesFunction();
        const user_interests = await getUserInterestsFunction();

        // Flag to indicate if the first data item has been received
        let firstDataFetched = false;

        for (let i = 0; i < preferred_sources.length; i++) {
            await getNewsListAPI([preferred_sources[i]], user_interests).then((response) => {
                if (response.data.length > 0) {
                    setNewsList((prev) => [...prev, ...response.data]);
                    console.log("List", response.data);

                    // If the first data is not yet fetched, mark it as fetched and set loading to false
                    if (!firstDataFetched) {
                        firstDataFetched = true;  // Mark that the first non-empty data has been fetched
                        setLoading(false);         // Stop loading after the first non-empty data is received
                    }
                } else {
                    console.log(`No data received from ${preferred_sources[i]}`);
                }
            });
        }

        // If all sources are processed and no non-empty data was received, you might want to handle that case
        if (!firstDataFetched) {
            setLoading(false); // Set loading to false if no non-empty data was fetched at all
        }
    }

    useFocusEffect(
        useCallback(() => {
            let isMounted = true;

            const checkPreferredSources = async () => {
                const newPreferredSources = await getPreferredSourcesFunction();

                // Check if the preferred sources have changed
                if (
                    isMounted &&
                    !areURLsEqualFunction(previousPreferredSources.current, newPreferredSources)
                ) {
                    // Update the previous preferred sources
                    previousPreferredSources.current = newPreferredSources;

                    // Update state with the new preferred sources
                    setPreferredSources(newPreferredSources);

                    // Fetch the news list after updating preferred sources
                    await fetchNewsList();
                }
            };

            checkPreferredSources();

            return () => {
                isMounted = false; // Cleanup function to avoid memory leaks
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
                ) : newsList.length > 0 ? (
                    (
                        <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ flex: 1, backgroundColor: Colors.current.background, paddingHorizontal: 16 }}>
                            {
                                newsList.map((item, index) => (
                                    <View key={index}>
                                        {
                                            index === 0 ? (
                                                <Pressable onPress={() => handleNavigateToNewsPage(item)}>
                                                    <BigNewsBox data={item} />
                                                </Pressable>
                                            ) : (
                                                <Pressable onPress={() => handleNavigateToNewsPage(item)}>
                                                    <NewsBox data={item} />
                                                </Pressable>
                                            )
                                        }
                                    </View>
                                ))
                            }
                        </ScrollView>
                    )
                ) : (
                    <>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: Colors.current.background,
                            }}>
                            <Text style={{ color: Colors.current.text, fontFamily: "NeueMachina-UltraBold", fontSize: 18 }}>
                                No new articles found!
                            </Text>
                            <Text style={{ color: Colors.current.text, fontFamily: "VelaSans-Light", fontSize: 16 }}>
                                Wait for the articles from other outlets to load...
                            </Text>
                        </View>
                    </>
                )
            }
        </>
    );
}
