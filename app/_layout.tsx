import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";


export const unstable_settings = {
  initialRouteName: "index",
};

export default function RootLayout() {
  return (
    <>
      <Stack.Screen />
      <Stack
        screenOptions={
          {
            // API Reference: https://reactnavigation.org/docs/native-stack-navigator#options
            
            headerShadowVisible: false,
            headerLargeTitle: true,
            headerStyle: {
              backgroundColor: Colors.current.background,
            },

            title: "Varta",
            headerTitleStyle: {
              color: Colors.current.text,
            },
          }
        }
      >
        <Stack.Screen
          name="index"
          options={{
            // headerShown: false
            // headerShadowVisible: false,
            // headerLargeTitle: true,

            // title: "Varta",
            // headerTitleStyle: {
            //   color: 'white',
            // },
            // headerStyle: {
            //   backgroundColor: '#131313',
            // },
          }}
        />
        {/* <Stack.Screen
          name="second"
          options={{
            headerLargeTitle: true,
            title: "Search",
          }}
        /> */}
      </Stack>
    </>
  );
}
