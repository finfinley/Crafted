import {
  Lusitana_400Regular,
  Lusitana_700Bold,
} from "@expo-google-fonts/lusitana";
import { Satisfy_400Regular } from '@expo-google-fonts/satisfy';
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { OFF_WHITE } from "lib/styles";
import { useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Lusitana_400Regular,
    Lusitana_700Bold,
    Satisfy_400Regular
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
      <Stack.Screen
        name="index"
        options={{ headerShown: false, headerTitle: "Profile" }}
      />
    </Stack>
  );
}
