import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useSession } from "lib/ctx";
import { BACKGROUND_COLOR, OFF_WHITE, SILK_CHOCOLATE } from "lib/styles";
import { StyleSheet, View } from "react-native";
import Profile from "screens/Profile";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { session } = useSession();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Profile",
          headerTintColor: "white",
          headerStyle: { backgroundColor: SILK_CHOCOLATE },
          headerShown: false,
        }}
      />
      <Profile key={session.user.id} session={session} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    color: OFF_WHITE,
  },
});
