import { UpdateSettings } from "screens/UpdateSettings";
import { Stack } from "expo-router";
import { BACKGROUND_COLOR, SILK_CHOCOLATE } from "lib/styles";
import { ScrollView } from "react-native-gesture-handler";

export default function Settings() {

  return (
    <ScrollView style={{ backgroundColor: BACKGROUND_COLOR, height: "100%" }}>
      <Stack.Screen
        options={{
          title: "Settings",
          headerTintColor: "white",
          headerStyle: { backgroundColor: SILK_CHOCOLATE },
        }}
      />
      <UpdateSettings />
    </ScrollView>
  );
}
