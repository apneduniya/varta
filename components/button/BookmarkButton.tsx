import { Colors } from "@/constants/Colors";
import { removeItem } from "@/utils/AsyncStorage";
import { bookmarkFunction, isBookmarkedFunction, unBookmarkFunction } from "@/utils/bookmark";
import { NewsListDataObject } from "@/utils/types";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";


export default function BookmarkButton({ newsData }: { newsData: NewsListDataObject }) {
    const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

    useEffect(() => {
        // Check if the news item is bookmarked
        isBookmarkedFunction(newsData).then((result) => {
            setIsBookmarked(result);
        });

        // removeItem('bookmarkedNews');
    }, []);

    const toogleBookmark = async () => {
        if (isBookmarked) {
            await unBookmarkFunction(newsData);
        } else {
            await bookmarkFunction(newsData);
        }
        setIsBookmarked(!isBookmarked);
    }

    return (
        <>
            <Pressable
                onPress={toogleBookmark}
            >
                <View
                    style={{
                        alignSelf: 'flex-start',
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        borderRadius: 10,
                        borderColor: isBookmarked ? Colors.current.tint : 'gray',
                        borderWidth: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 5
                    }}
                >
                    <Image source={isBookmarked? require('@/assets/images/icons/bookmarked.svg'): require('@/assets/images/icons/bookmark.svg')} style={{ width: 10, height: 14, tintColor: isBookmarked ? Colors.current.tint : 'gray' }} />
                    <Text style={{ color: isBookmarked ? Colors.current.tint : 'gray', marginLeft: 5, fontSize: 12, fontFamily: "EulidCircular-Regular" }}>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</Text>
                </View>
            </Pressable>
        </>
    )
}







