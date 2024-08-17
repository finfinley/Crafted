import * as SplashScreen from "expo-splash-screen";
import { BACKGROUND_COLOR, OFF_WHITE } from "lib/styles";
import { StyleSheet, View } from "react-native";
import Login from "screens/Login";

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <View style={styles.container}>
      <Login />
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
