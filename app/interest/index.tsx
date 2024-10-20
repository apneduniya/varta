import CheckboxTab from "@/components/common/CheckboxTab";
import Loading from "@/components/common/Loading";
import { Colors } from "@/constants/Colors";
import { getNewsInterestsAPI } from "@/service/news/getNewsInterests";
import { addUserInterestFunction, getUserInterestsFunction, removeUserInterestFunction } from "@/utils/userInterests";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text } from "react-native";

interface NewsInterestsDataObject {
    name: string;
    selected: boolean;
}


export default function Interests() {
    const [userInterest, setUserInterest] = useState<Array<NewsInterestsDataObject>>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true); // Set loading to true at the start of the effect

        // Fetch news interest list
        getNewsInterestsAPI().then(async (response) => {
            if (response.status === 'success') {
                // Get the selected news interest from AsyncStorage
                const userSelectedNewsOutlet: string[] = await getUserInterestsFunction();

                const temp: NewsInterestsDataObject[] = [];
                // Mark the selected news interest
                response.data.forEach((item) => {
                    if (userSelectedNewsOutlet.includes(item)) {
                        temp.push({ name: item, selected: true });
                    } else {
                        temp.push({ name: item, selected: false });
                    }
                });

                setUserInterest(temp);
            }
        }).finally(() => {
            setLoading(false); // Set loading to false after the data is fetched
        });

    }, []);

    const handleNewsInterestSelection = (interest: string, selected: boolean) => {
        if (selected) {
            // Remove the news interest
            removeUserInterestFunction(interest);
        } else {
            // Add the news interest
            addUserInterestFunction(interest);
        }

        // Update the selected state
        setUserInterest((prev) => {
            return prev.map((item) => {
                if (item.name === interest) {
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
                            userInterest.map((item, index) => {
                                return (
                                    <Pressable
                                        style={{ marginBottom: 16 }}
                                        key={index}
                                        onPress={() => handleNewsInterestSelection(item.name, item.selected ?? false)}
                                    >
                                        <CheckboxTab
                                            key={index}
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

