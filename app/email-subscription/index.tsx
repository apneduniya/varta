import OutlineButton from "@/components/button/OutlineButton";
import SwitchTabButton from "@/components/button/SwitchTabButton";
import Loading from "@/components/common/Loading";
import { Colors } from "@/constants/Colors";
import { getgetEmailSubcriptionFrequencyAPI } from "@/service/email-subscription/getEmailSubcriptionFrequency";
import { getEmailSubcriptionStatusAPI } from "@/service/email-subscription/getEmailSubcriptionStatus";
import { postEmailSubscriptionFrequencyAPI } from "@/service/email-subscription/postEmailSubscriptionFrequency";
import { postEmailSubscribeStatusAPI } from "@/service/email-subscription/postEmailSubscriptionStatus";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";


export default function EmailSubscription() {
    const [isEnabled, setIsEnabled] = useState(false);
    const [userChangedStatus, setUserChangedStatus] = useState(false);
    const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly'>("daily");
    const [userChangedFrequency, setUserChangedFrequency] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => { // User email subscription status change effect
        if (userChangedStatus) {
            // Call API to update email subscription status
            postEmailSubscribeStatusAPI(isEnabled);
            setUserChangedStatus(false);
        }
    }, [userChangedStatus, isEnabled]);

    useEffect(() => { // User email subscription frequency change effect
        if (userChangedFrequency) {
            // Call API to update email subscription frequency
            postEmailSubscriptionFrequencyAPI(frequency);
            setUserChangedFrequency(false);
        }
    }, [userChangedFrequency, frequency]);


    useFocusEffect(
        useCallback(() => {
            let isActive = true; // to handle component unmount

            const fetchEmailSubscriptionData = async () => {
                try {
                    setLoading(true);
                    // Fetch user email subscription status
                    const response = await getEmailSubcriptionStatusAPI();

                    if (isActive && response.status === 'success') {
                        setIsEnabled(response.isSubscribed);

                        // Fetch user email subscription frequency
                        const frequencyResponse = await getgetEmailSubcriptionFrequencyAPI();
                        if (isActive && frequencyResponse.status === 'success') {
                            setFrequency(frequencyResponse.frequency);
                        }
                    }

                    setLoading(false);

                } catch (error) {
                    console.error('Failed to fetch email subscription data:', error);
                }
            };

            fetchEmailSubscriptionData();

            // Cleanup function to prevent state updates if component unmounts
            return () => {
                isActive = false;

                setIsEnabled(false);
                setFrequency("daily");
            };

        }, [])
    );


    return (
        <>
            {
                loading ? (
                    <Loading />
                ) : (
                    <>
                        <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ flex: 1, backgroundColor: Colors.current.background, paddingHorizontal: 16 }}>
                            <View style={{ marginTop: 16 }}>
                                <SwitchTabButton title="Email Subscription" value={isEnabled} onPress={() => { setIsEnabled(!isEnabled); setUserChangedStatus(true) }} />
                            </View>
                            {
                                isEnabled && (
                                    <>
                                        <View>
                                            <Text style={{ color: Colors.current.text, fontSize: 16, fontFamily: "EulidCircular-Regular", marginTop: 32, textAlign: "center" }}>
                                                I am interested to receive newsletter...
                                            </Text>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    gap: 16,
                                                    justifyContent: 'center',
                                                    marginTop: 16
                                                }}
                                            >
                                                <Pressable onPress={() => { setFrequency("daily"); setUserChangedFrequency(true) }}>
                                                    <OutlineButton title="Daily" isSelected={frequency === "daily"} />
                                                </Pressable>
                                                <Pressable onPress={() => { setFrequency("weekly"); setUserChangedFrequency(true) }}>
                                                    <OutlineButton title="Weekly" isSelected={frequency === "weekly"} />
                                                </Pressable>
                                                <Pressable onPress={() => { setFrequency("monthly"); setUserChangedFrequency(true) }}>
                                                    <OutlineButton title="Monthly" isSelected={frequency === "monthly"} />
                                                </Pressable>
                                            </View>
                                        </View>
                                    </>
                                )
                            }
                        </ScrollView>
                    </>
                )
            }
        </>
    )
}

