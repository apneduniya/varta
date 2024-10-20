import { Image } from "expo-image";
import { Linking, Pressable, Text, View } from "react-native";


export default function ReadFullArticleButton({ link }: { link: string }) {

    const handleOpenLink = (link: string) => {
        Linking.openURL(link)
    }

    return (
        <>
            <Pressable
                onPress={() => handleOpenLink(link)}
            >
                <View
                    style={{
                        alignSelf: 'flex-start',
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        borderRadius: 10,
                        borderColor: 'gray',
                        borderWidth: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 5
                    }}
                >
                    <Image source={require('@/assets/images/icons/book_open.svg')} style={{ width: 17, height: 14, tintColor: 'gray' }} />
                    <Text style={{ color: 'gray', marginLeft: 5, fontSize: 12, fontFamily: "EulidCircular-Regular" }}>
                        Read full article
                    </Text>
                </View>
            </Pressable>
        </>
    )
}







