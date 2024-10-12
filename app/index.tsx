import Loading from "@/components/common/Loading";
import NewsBox from "@/components/common/NewsBox";
import { Colors } from "@/constants/Colors";
import { getNewsListAPI } from "@/service/getNewsList";
import { newsCardColorFunction } from "@/utils/newsCardColor";
import { NewsDataObject } from "@/utils/types";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";


export default function Index() {
    const [loading, setLoading] = useState<boolean>(false);
    const [newsList, setNewsList] = useState<Array<NewsDataObject>>(
        [
            {
                "link": "https://ideas.rickybrowne.com/annoying-alarm-app",
                "publish_date": "2024-10-13 01:46:28",
                "source": "Hashnode - Blog",
                "title": "Annoying Alarm App"
            },
            {
                "link": "https://hailey07.hashnode.dev/activity-29-http-methods",
                "publish_date": "2024-10-13 01:34:28",
                "source": "Hashnode - Blog",
                "title": "Activity 29: HTTP Methods"
            },
            {
                "link": "https://mihirsuratwala.hashnode.dev/introduction-to-basic-commands-in-linux",
                "publish_date": "2024-10-13 01:31:28",
                "source": "Hashnode - Blog",
                "title": "Introduction to Basic Commands in Linux"
            },
            {
                "link": "https://developer.tenten.co/use-mwebs-publish-script-to-publish-to-hashnode",
                "publish_date": "2024-10-13 01:14:28",
                "source": "Hashnode - Blog",
                "title": "Use MWeb's Publish Script to publish to Hashnode"
            },
            {
                "link": "https://washid123539.hashnode.dev/building-a-dynamic-dessert-shop-with-react",
                "publish_date": "2024-10-13 01:14:28",
                "source": "Hashnode - Blog",
                "title": "Building a Dynamic Dessert Shop with React"
            },
            {
                "link": "https://rihamfh.hashnode.dev/algorithmic-complexity",
                "publish_date": "2024-10-13 01:14:28",
                "source": "Hashnode - Blog",
                "title": "Algorithmic Complexity"
            },
            {
                "link": "https://jumalaw98.hashnode.dev/ransomware-protection",
                "publish_date": "2024-10-13 01:14:28",
                "source": "Hashnode - Blog",
                "title": "Day 12: Ransomware Protection"
            },
            {
                "link": "https://200devsok.hashnode.dev/building-a-journal-app-api-with-spring-boot-a-step-by-step-guide",
                "publish_date": "2024-10-13 01:14:28",
                "source": "Hashnode - Blog",
                "title": "Building a Journal App API with Spring Boot: A Step-by-Step Guide"
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

        // fetchNewsList();

    }, []);

    return (
        <>
            {
                loading ? (
                    <Loading />
                ) : (
                    <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ flex: 1, backgroundColor: Colors.current.background, paddingHorizontal: 16 }}>
                        {
                            newsList.map((item, index) => (
                                <NewsBox key={index} color={newsCardColorFunction(index)} data={item} />
                            ))
                        }
                    </ScrollView>
                )
            }
        </>
    );
}
