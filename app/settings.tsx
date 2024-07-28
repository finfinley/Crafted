import { Input } from "@rneui/themed";
import Box from "components/Box";
import { Stack } from "expo-router";
import {
  BACKGROUND_COLOR,
  BOLD_FONT,
  DARK_BLUE,
  OFF_WHITE,
  PIRATE_TAN,
  SILK_CHOCOLATE,
} from "lib/styles";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { DateField } from "@mui/x-date-pickers/DateField";

export default function Settings() {
  return (
    <View style={{ backgroundColor: BACKGROUND_COLOR, height: "100%" }}>
      <Stack.Screen
        options={{
          title: "Edit Profile",
          headerTintColor: OFF_WHITE,
          headerStyle: { backgroundColor: SILK_CHOCOLATE }, 
        }}
      />
      {/* Profile Details */}
      <Box title="Profile Details">
        <View style={styles.row}>
          <Input
            placeholder={"Display Name"}
            labelStyle={styles.inputFont}
            inputStyle={styles.inputFont}
            placeholderTextColor="#87919E"
          />
        </View>
        <View style={styles.row}>
          <Input
            placeholder={"Location"}
            labelStyle={styles.inputFont}
            inputStyle={styles.inputFont}
            placeholderTextColor="#87919E"
          />
        </View>
        <View style={styles.row}>
          <Input
            placeholder={"Bio"}
            inputStyle={styles.inputFont}
            placeholderTextColor="#87919E"
            multiline
            numberOfLines={5}
            maxLength={100}
          />
        </View>
      </Box>
      {/* Personal Information */}
      <Box title={"Personal Information"}>
        <View style={styles.row}>
          <Input
            placeholder={"Email"}
            labelStyle={styles.inputFont}
            inputStyle={styles.inputFont}
            placeholderTextColor="#87919E"
          />
        </View>
        <View style={styles.row}>
          {/* <DateField label="Basic date field" /> */}
        </View>
      </Box>
    </View>
  );
}

const PADDING_RL = 8;

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    flexDirection: "row",
  },
  inputFont: {
    fontFamily: BOLD_FONT,
    color: "#87919E",
    fontSize: 14,
  },
});
