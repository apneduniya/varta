import ProfileTab from "@/components/auth/ProfileTab";
import LogoutButton from "@/components/button/LogoutButton";
import SettingsNavButton from "@/components/button/SettingsTabButton";
import DotDivider from "@/components/common/DotDivider";
import { Colors } from "@/constants/Colors";
import { getUserAPI } from "@/service/auth/getUser";
import { UserDetailsObject } from "@/utils/types";
import { useState, useCallback } from "react";
import { ScrollView, View } from "react-native";
import { useFocusEffect } from '@react-navigation/native';


export default function Settings() {
    const [userData, setUserData] = useState<UserDetailsObject>({
        email: "",
        name: "",
        user_interests: [],
        preferred_sources: [],
        role: "",
        created_at: "",
        _id: "",
        subscription_frequency: "",
        subscription_status: false
    });


    useFocusEffect(
        useCallback(() => {
            let isActive = true; // to handle component unmount

            const fetchUserData = async () => {
                try {
                    const response = await getUserAPI();
                    console.log(response);

                    if (isActive && response.status === "success") {
                        if (response.data) {
                            setUserData(response.data);
                        }
                    }
                } catch (error) {
                    console.error('Failed to fetch user data:', error);
                }
            }

            fetchUserData();

            // Cleanup function to run when the component unmounts or re-renders
            return () => {
                isActive = false;
                setUserData({
                    email: "",
                    name: "",
                    user_interests: [],
                    preferred_sources: [],
                    role: "",
                    created_at: "",
                    _id: "",
                    subscription_frequency: "",
                    subscription_status: false
                });
            };

        }, [])
    );


    return (
        <>
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ flex: 1, backgroundColor: Colors.current.background, paddingHorizontal: 16 }}>
                {
                    userData.email !== "" && userData.name !== "" &&
                    <ProfileTab email={userData.email} name={userData.name} />
                }
                <View
                    style={{ marginVertical: 16 }}
                >
                    <SettingsNavButton route="/interest" iconSrc={require('@/assets/images/icons/heart.svg')} title="Interests" iconWidth={22} iconHeight={20} />
                </View>
                <View
                    style={{ marginBottom: 16 }}
                >
                    <SettingsNavButton route="/news-outlet" iconSrc={require('@/assets/images/icons/outlet.svg')} title="News Outlets" iconWidth={19} iconHeight={20} />
                </View>
                <View>
                    <SettingsNavButton
                        route={!userData.email && !userData.name ? "/login" : "/email-subscription"}
                        iconSrc={require('@/assets/images/icons/mail.svg')}
                        title="Email Subscription"
                        iconWidth={20}
                        iconHeight={16}
                    />
                </View>
                {/* <View
                    style={{ marginBottom: 16 }}
                >
                    <SettingsNavButton route="/language" iconSrc={require('@/assets/images/icons/language.svg')} title="Language" />
                </View> */}
                <DotDivider />
                {
                    !userData.email && !userData.name &&
                    <View>
                        <SettingsNavButton route="/login" iconSrc={require('@/assets/images/icons/user.svg')} title="Sign In" iconWidth={18} iconHeight={20} />
                    </View>
                }
                {
                    userData.email !== "" && userData.name !== "" &&
                    <LogoutButton />
                }
            </ScrollView>
        </>
    )
}


