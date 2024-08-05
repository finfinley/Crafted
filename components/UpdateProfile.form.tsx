import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, CheckBox, Input } from "@rneui/themed";
import dayjs from "dayjs";
import { router } from "expo-router";
import { Formik } from "formik";
import {
  BOLD_FONT,
  DARK_BLUE,
  FLORAL_GRAY,
  OFF_WHITE,
  RED,
  SILK_CHOCOLATE,
  TAN_GRAY,
} from "lib/styles";
import { supabase } from "lib/supabase";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Box from "./Box";
import DropdownComponent from "./form/Dropdown";

export function logout() {
  supabase.auth.signOut();
  router.replace("/");
}

export const UpdateProfile = ({}) => {
  const twentyOneYearsAgo = dayjs(new Date()).subtract(21, "years").toDate();
  return (
    <Formik
      initialValues={{
        displayName: "",
        location: "",
        bio: "",
        email: "",
        pronouns: { pronouns: "", visible: false },
        birthday: twentyOneYearsAgo,
      }}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => (
        <View>
          <Box title="Profile Details">
            <View style={styles.row}>
              <Input
                placeholder={"Display Name"}
                labelStyle={styles.inputLabel}
                inputStyle={[styles.inputFont]}
                placeholderTextColor={FLORAL_GRAY}
                onChangeText={handleChange("displayName")}
                onBlur={handleBlur("displayName")}
                value={values.displayName}
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
                  name="pronouns.pronouns"
                  setFieldValue={setFieldValue}
                  value={values.pronouns.pronouns}
                />
              </View>
              <View>
                <CheckBox
                  size={18}
                  containerStyle={{ backgroundColor: OFF_WHITE, padding: 0 }}
                  title="Visible on Profile"
                  checked={values.pronouns.visible}
                  textStyle={[styles.inputLabel, { marginLeft: 3 }]}
                  checkedColor={SILK_CHOCOLATE}
                  onPress={() =>
                    setFieldValue("pronouns.visible", !values.pronouns.visible)
                  }
                />
              </View>
            </View>
            <View style={styles.row}>
              <View>
                <Text style={[styles.inputFont, styles.datePickerLabel]}>
                  Birthday:
                </Text>
                <DateTimePicker
                  maximumDate={twentyOneYearsAgo}
                  value={dayjs(values.birthday).toDate()}
                  accentColor={FLORAL_GRAY}
                  textColor={FLORAL_GRAY}
                  onChange={() => handleChange("birthday")}
                />
              </View>
            </View>
          </Box>
          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              color={DARK_BLUE}
              title="Save"
              // disabled={loading}
              onPress={() => handleSubmit()}
            />
            <Button
              style={styles.button}
              color={RED}
              title="Log Out"
              // disabled={loading}
              onPress={() => {
                logout();
              }}
            />
          </View>
        </View>
      )}
    </Formik>
  );
};

const PADDING_RL = 8;

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    flexDirection: "row",
  },
  input: {
    color: TAN_GRAY,
  },
  inputFont: {
    fontFamily: BOLD_FONT,
    color: SILK_CHOCOLATE,
    fontSize: 14,
  },
  inputLabel: {
    fontFamily: BOLD_FONT,
    color: FLORAL_GRAY,
    fontSize: 14,
  },
  pronouns: {
    // flexDirection: "row",
  },
  datePickerLabel: {
    paddingLeft: 10,
    paddingBottom: 2,
  },
  buttonContainer: {
    marginTop: "5%",
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    width: 150,
    height: 200,
    paddingRight: PADDING_RL,
    paddingLeft: PADDING_RL,
  },
});
