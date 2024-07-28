import {
  Lusitana_400Regular,
  Lusitana_700Bold,
} from "@expo-google-fonts/lusitana";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { OFF_WHITE } from "lib/styles";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Lusitana_400Regular,
    Lusitana_700Bold,
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
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: OFF_WHITE,
        },
        headerTitleStyle: {
          color: OFF_WHITE,
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false, headerTitle: 'Profile' }} />
    </Stack>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    color: OFF_WHITE,
  },
};
