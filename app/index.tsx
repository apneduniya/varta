import Loading from "@/components/common/Loading";
import NewsBox from "@/components/common/NewsBox";
import { Colors } from "@/constants/Colors";
import { getNewsListAPI } from "@/service/getNewsList";
import { NewsListDataObject } from "@/utils/types";
import { setItem } from "@/utils/AsyncStorage";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { CURRENT_NEWS_DATA } from "@/utils/constants";
import BigNewsBox from "@/components/common/BigNewsBox";


export default function Index() {
    const [loading, setLoading] = useState<boolean>(false);
    const [newsList, setNewsList] = useState<Array<NewsListDataObject>>(
        [
            {
                "title": "Azure AKS Hands-On Labs - Azure Container Registry (ACR) Troubleshooting Common Issues",
                "link": "https://clouddevopslearn.hashnode.dev/azure-aks-hands-on-labs-azure-container-registry-acr-troubleshooting-common-issues",
                "publish_date": "2024-10-14 01:09:17",
                "preview_image": "https://hashnode.com/utility/r?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1728848493446%2Fb3280dd7-fccc-4cf2-9c79-e5a4f30d8202.png%3Fw%3D1200%26auto%3Dcompress%2Cformat%26format%3Dwebp%26fm%3Dpng",
                "source": "Hashnode - Blog"
            },
            {
                "title": "Community Over Code NA 2024 Apache Lucene/Solr Birds of a Feather",
                "link": "https://dep4b.hashnode.dev/community-over-code-na-2024-apache-lucenesolr-birds-of-a-feather",
                "publish_date": "2024-10-14 00:56:17",
                "preview_image": "https://hashnode.com/utility/r?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1728847490147%2F4495f7a8-aa60-4155-9b97-d9b077081a70.png%3Fw%3D1200%26h%3D630%26fit%3Dcrop%26crop%3Dentropy%26auto%3Dcompress%2Cformat%26format%3Dwebp%26fm%3Dpng",
                "source": "Hashnode - Blog"
            },
            {
                "title": "How Git Cherry-Pick Saved My Day: A Tale of Branch Chaos",
                "link": "https://mahmudrafid.hashnode.dev/how-git-cherry-pick-saved-my-day-a-tale-of-branch-chaos",
                "publish_date": "2024-10-14 00:26:17",
                "preview_image": "https://hashnode.com/utility/r?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1728846321581%2Ff15ca431-60a2-45e8-8359-006c5922ca0d.webp%3Fw%3D1200%26auto%3Dcompress%2Cformat%26format%3Dwebp%26fm%3Dpng",
                "source": "Hashnode - Blog"
            },
            {
                "title": "Blockchain Beyond Cryptocurrency: Exploring Smart Contracts, NFTs, and Decentralized Finance",
                "link": "https://abgowdahc.hashnode.dev/blockchain-beyond-cryptocurrency-exploring-smart-contracts-nfts-and-decentralized-finance",
                "publish_date": "2024-10-14 00:26:17",
                "preview_image": "https://hashnode.com/utility/r?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1728845583958%2Fa1033e25-9d64-4c50-9c29-9ecc38bcc2b5.webp%3Fw%3D1200%26h%3D630%26fit%3Dcrop%26crop%3Dentropy%26auto%3Dcompress%2Cformat%26format%3Dwebp%26fm%3Dpng",
                "source": "Hashnode - Blog"
            },
            {
                "title": "How Javascript Works",
                "link": "https://avezqureshi14.hashnode.dev/how-javascript-works",
                "publish_date": "2024-10-14 00:26:17",
                "preview_image": "https://avezqureshi14.hashnode.dev/api/og/post?og=eyJ0aXRsZSI6IkhvdyUyMEphdmFzY3JpcHQlMjBXb3JrcyIsImF1dGhvciI6IkF2ZXolMjBRdXJlc2hpIiwiZG9tYWluIjoiYXZlenF1cmVzaGkxNC5oYXNobm9kZS5kZXYiLCJwaG90byI6Imh0dHBzOi8vY2RuLmhhc2hub2RlLmNvbS9yZXMvaGFzaG5vZGUvaW1hZ2UvdXBsb2FkL3YxNjg4MzAyNjY5MDU1LzlhYjFjODRmLWNhODktNDMzNS05NjIwLWVkNjRkNjE3NWI1ZC5qcGVnIiwiYmdjb2xvciI6IiMyOTYyRkYiLCJyZWFkVGltZSI6M30=",
                "source": "Hashnode - Blog"
            }
        ]
    );


    useEffect(() => {
        async function fetchNewsList() {
            setLoading(true);

            const preferred_sources = [
                13
            ];
            const user_interests = [
                "technology"
            ];

            const response = await getNewsListAPI(preferred_sources, user_interests);
            setNewsList(response.data);
            console.log("List", response.data);

            setLoading(false);
        }

        fetchNewsList();

    }, []);

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
            }
        </>
    );
}
