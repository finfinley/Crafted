import { Stack } from "expo-router";
import {
    BACKGROUND_COLOR,
    OFF_WHITE,
    SILK_CHOCOLATE
} from "lib/styles";
import { Text, View } from "react-native";

export default function Settings() {
  
  return (
    <View style={{ backgroundColor: BACKGROUND_COLOR, height: "100%" }}>
      <Stack.Screen
        options={{
          title: "Edit Profile",
          headerTintColor: OFF_WHITE,
          headerStyle: { backgroundColor: SILK_CHOCOLATE }, // TAN: #FBD1A2 BITTERSWEET: #FF6663
        }}
      />
      <Text style={{ color: "white" }}>Hello World</Text>
    </View>
  );
}
