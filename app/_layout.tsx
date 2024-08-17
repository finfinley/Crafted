import { Gotu_400Regular } from "@expo-google-fonts/gotu";
import {
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import {
  Lusitana_400Regular,
  Lusitana_700Bold,
} from "@expo-google-fonts/lusitana";
import { Satisfy_400Regular } from "@expo-google-fonts/satisfy";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { AuthProvider } from "lib/ctx";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Lusitana_400Regular,
    Lusitana_700Bold,
    Satisfy_400Regular,
    Gotu_400Regular,
    Inter_400Regular,
    Inter_700Bold,
    Inter_500Medium,
    Inter_300Light,
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
    <GestureHandlerRootView>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
