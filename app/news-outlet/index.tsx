import CheckboxTabWithIcon from "@/components/common/CheckboxTabWithIcon";
import Loading from "@/components/common/Loading";
import { Colors } from "@/constants/Colors";
import { getNewsOutletAPI } from "@/service/news/getNewsOutlet";
import { getPreferredSourcesFunction, addPreferredSourceFunction, removePreferredSourceFunction } from "@/utils/preferredSources";
import { NewsOutletDataObject } from "@/utils/types";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text } from "react-native";


export default function NewsOutlet() {
    const [newsOutlet, setNewsOutlet] = useState<Array<NewsOutletDataObject>>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true); // Set loading to true at the start of the effect

        // Fetch news outlet list
        getNewsOutletAPI().then(async (response) => {
            if (response.status === 'success') {
                // Get the selected news outlet from AsyncStorage
                const selectedNewsOutlet: string[] = await getPreferredSourcesFunction();

                // Mark the selected news outlet
                response.data.forEach((item) => {
                    if (selectedNewsOutlet.includes(item.url)) {
                        item.selected = true;
                    }
                });

                setNewsOutlet(response.data);
            }
        }).finally(() => {
            setLoading(false); // Set loading to false after the data is fetched
        });

    }, []);

    const handleNewsOutletSelection = (url: string, selected: boolean) => {
        if (selected) {
            // Remove the news outlet from the preferred sources
            removePreferredSourceFunction(url);
        } else {
            // Add the news outlet to the preferred sources
            addPreferredSourceFunction(url);
        }

        // Update the selected state
        setNewsOutlet((prev) => {
            return prev.map((item) => {
                if (item.url === url) {
                    item.selected = !selected;
                }
                return item;
            });
        });
    }

    return (
        <>
            {
                loading ?
                    <Loading />
                    :
                    <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ flex: 1, backgroundColor: Colors.current.background, paddingHorizontal: 16, paddingVertical: 16 }}>
                        {
                            newsOutlet.map((item, index) => {
                                return (
                                    <Pressable
                                        style={{ marginBottom: 16 }}
                                        key={index}
                                        onPress={() => handleNewsOutletSelection(item.url, item.selected ?? false)}
                                    >
                                        <CheckboxTabWithIcon
                                            key={index}
                                            iconSrc={item.icon}
                                            title={item.name}
                                            selected={item.selected ?? false}
                                        />
                                    </Pressable>
                                )
                            })
                        }
                    </ScrollView>
            }
        </>
    )
}

