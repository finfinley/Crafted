import DateTimePicker from "@react-native-community/datetimepicker";
import { CheckBox, Input } from "@rneui/themed";
import dayjs from "dayjs";
import { FormikProps } from "formik";
import {
  FLORAL_GRAY,
  OFF_WHITE,
  REGULAR_FONT,
  SILK_CHOCOLATE,
  TAN_GRAY,
} from "lib/styles";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Box from "../Box";
import DropdownComponent from "../input/Dropdown";
import { ProfileFormValues } from "./types";

export const UpdateProfileForm = ({
  formContext,
}: {
  formContext: FormikProps<ProfileFormValues>;
}) => {
  const { handleBlur, handleChange, values, setFieldValue } = formContext;

  return (
    <View>
      <Box title="Profile Details">
        <View style={styles.row}>
          <Input
            placeholder={"Display Name"}
            labelStyle={styles.inputLabel}
            inputStyle={[styles.inputFont]}
            placeholderTextColor={FLORAL_GRAY}
            onChangeText={handleChange("handle")}
            onBlur={handleBlur("displayName")}
            value={values.handle}
          />
        </View>
        <View style={styles.row}>
          <Input
            placeholder={"Location"}
            labelStyle={styles.inputFont}
            inputStyle={styles.inputFont}
            placeholderTextColor={FLORAL_GRAY}
            onChangeText={handleChange("location")}
            onBlur={handleBlur("location")}
            value={values.location}
          />
        </View>
        <View style={styles.row}>
          <Input
            placeholder={"Bio"}
            inputStyle={styles.inputFont}
            placeholderTextColor={FLORAL_GRAY}
            multiline
            numberOfLines={3}
            maxLength={100}
            onChangeText={handleChange("bio")}
            onBlur={handleBlur("bio")}
            value={values.bio}
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
            placeholderTextColor={FLORAL_GRAY}
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "50%" }}>
            <DropdownComponent
              name="pronouns.selected"
              setFieldValue={setFieldValue}
              value={values.pronouns.selected}
            />
          </View>
          <View>
            <CheckBox
              size={18}
              containerStyle={{ backgroundColor: OFF_WHITE, padding: 0 }}
              title="Visible on Profile"
              checked={values.pronouns.visible}
              textStyle={[styles.inputFont, { marginLeft: 3 }]}
              checkedColor={SILK_CHOCOLATE}
              onPress={() =>
                setFieldValue("pronouns.visible", !values.pronouns.visible)
              }
            />
          </View>
        </View>
        <View style={styles.row}>
          <Text style={[styles.inputFont, styles.datePickerLabel]}>
            Birthday:
          </Text>
        </View>
        <View style={[styles.row, { paddingBottom: 25}]}>
          <DateTimePicker
            value={values.birthday}
            accentColor={FLORAL_GRAY}
            textColor={FLORAL_GRAY}
            style={{ width: "35%", marginLeft: 0 }}
            onChange={(val) =>
              setFieldValue(
                "birthday",
                dayjs(val.nativeEvent.timestamp).toDate()
              )
            }
          />
        </View>
      </Box>
    </View>
  );
};

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
