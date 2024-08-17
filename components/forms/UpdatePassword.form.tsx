import { Input } from "@rneui/themed";
import Box from "components/Box";
import CraftedButton from "components/buttons/CraftedButton";
import {
  FLORAL_GRAY,
  REGULAR_FONT,
  SILK_CHOCOLATE,
  TAN_GRAY,
} from "lib/styles";
import { StyleSheet, Text, View } from "react-native";

export function UpdatePasswordForm({}: //   session,
//   loading,
//   setLoading,
{
  //   session: any;
  //   loading: boolean;
  //   setLoading: any;
}) {
  return (
    <View>
      <Box title="Update Password">
        <View style={styles.row}>
          <Input
            placeholder={"Current Password"}
            labelStyle={styles.inputLabel}
            inputStyle={[styles.inputFont]}
            placeholderTextColor={FLORAL_GRAY}
            // onChangeText={formContext.handleChange("oldPassword")}
            // onBlur={formContext.handleBlur("oldPassword")}
            // value={formContext.values.oldPassword}
            secureTextEntry
          />
        </View>
        <View style={styles.row}>
          <Input
            placeholder={"New Password"}
            labelStyle={styles.inputLabel}
            inputStyle={[styles.inputFont]}
            placeholderTextColor={FLORAL_GRAY}
            // onChangeText={formContext.handleChange("oldPassword")}
            // onBlur={formContext.handleBlur("oldPassword")}
            // value={formContext.values.oldPassword}
            secureTextEntry
          />
        </View>
      </Box>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  input: {
    color: TAN_GRAY,
  },
  inputFont: {
    fontFamily: REGULAR_FONT,
    color: SILK_CHOCOLATE,
    fontSize: 14,
  },
  inputLabel: {
    fontFamily: REGULAR_FONT,
    color: FLORAL_GRAY,
    fontSize: 14,
  },
  datePickerLabel: {
    paddingLeft: 10,
    paddingBottom: 2,
  },
});
