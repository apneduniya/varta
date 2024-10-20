import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";


SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
    initialRouteName: "index",
};

export default function RootLayout() {
    const [loaded, error] = useFonts({
        'EulidCircular-Regular': require('@/assets/fonts/EulidCircular-Regular.ttf'),
        'NeueMachina-UltraBold': require('@/assets/fonts/NeueMachina-UltraBold.otf'),
        'VelaSans-Light': require('@/assets/fonts/VelaSans-Light.otf'),
        'LemonMilk-Bold': require('@/assets/fonts/LemonMilk-Bold.otf'),
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <>
            {/* <Stack.Screen />
            <Stack
                screenOptions={
                    {
                        // API Reference: https://reactnavigation.org/docs/native-stack-navigator#options

                        headerShadowVisible: false,
                        headerLargeTitle: true,
                        headerStyle: {
                            backgroundColor: Colors.current.background,
                        },
                        headerTintColor: Colors.current.text,
                    }
                }
            >
                <Stack.Screen
                    name="index"
                    options={{
                        title: "Varta",
                        headerTitleStyle: {
                            color: Colors.current.text,
                            fontFamily: "NeueMachina-UltraBold"
                        },
                    }}
                />
                <Stack.Screen
                    name="news/index"
                    options={{
                        title: "",
                    }}
                />
            </Stack> */}
            <Stack
                screenOptions={
                    {
                        // API Reference: https://reactnavigation.org/docs/native-stack-navigator#options

                        headerShadowVisible: false,
                        headerLargeTitle: true,
                        headerStyle: {
                            backgroundColor: Colors.current.background,
                        },
                        headerTintColor: Colors.current.text,
                    }
                }
            >
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                    name="news/index"
                    options={{
                        title: "",
                    }}
                />
                <Stack.Screen
                    name="interest/index"
                    options={{
                        title: ""
                    }}
                />
                <Stack.Screen
                    name="news-outlet/index"
                    options={{
                        title: ""
                    }}
                />
                <Stack.Screen
                    name="email-subscription/index"
                    options={{
                        title: ""
                    }}
                />
                <Stack.Screen
                    name="language/index"
                    options={{
                        title: ""
                    }}
                />
                <Stack.Screen
                    name="login/index"
                    options={{
                        title: ""
                    }}
                />
                <Stack.Screen
                    name="register/index"
                    options={{
                        title: ""
                    }}
                />
            </Stack >
        </>
    );
}
