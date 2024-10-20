import { Tabs } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Image } from 'expo-image';


export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor: Colors.current.background,
                },
                headerTitleStyle: {
                    color: Colors.current.text,
                    fontFamily: "NeueMachina-UltraBold"
                },
                headerTintColor: Colors.current.text,

                tabBarActiveTintColor: '#ffffff',
                tabBarStyle: {
                    backgroundColor: "#2B2B2B",
                    // borderTopWidth: 0.5,
                    // borderTopColor: "gray",
                    // borderTopWidth: 0,
                    height: 56,
                },
                tabBarShowLabel: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Varta',
                    tabBarIcon: ({ color, focused }) => (
                        // <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
                        <Image source={require('@/assets/images/icons/home.svg')} style={{ width: 28, height: 28, tintColor: focused ? Colors.current.tint : color }} />
                    ),
                }}
            />
            <Tabs.Screen
                name="bookmark/index"
                options={{
                    title: 'Bookmark',
                    tabBarIcon: ({ color, focused }) => (
                        // <Ionicons name={focused ? 'settings' : 'settings-outline'} color={color} size={24} />
                        <Image source={require('@/assets/images/icons/bookmark.svg')} style={{ width: 17, height: 23, tintColor: focused ? Colors.current.tint : color }} />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings/index"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color, focused }) => (
                        // <Ionicons name={focused ? 'settings' : 'settings-outline'} color={color} size={24} />
                        <Image source={require('@/assets/images/icons/settings.svg')} style={{ width: 24, height: 24, tintColor: focused ? Colors.current.tint : color }} />
                    ),
                }}
            />
        </Tabs>
    );
}
