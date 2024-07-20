// Rest of the import statements
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Slot } from "expo-router";
import {
  Lusitana_400Regular,
  Lusitana_700Bold,
} from "@expo-google-fonts/lusitana";
import { View, Text } from "react-native";

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
    <>
      <View style={styles.container}>
        <Slot />
      </View>
    </>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    color: "white",
  },
};
