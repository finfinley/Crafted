import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, CheckBox, Input } from "@rneui/themed";
import { UserData } from "app/settings";
import dayjs from "dayjs";
import { router } from "expo-router";
import { Formik } from "formik";
import {
  DARK_BLUE,
  FLORAL_GRAY,
  OFF_WHITE,
  RED,
  REGULAR_FONT,
  SILK_CHOCOLATE,
  TAN_GRAY,
} from "lib/styles";
import { supabase } from "lib/supabase";
import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Box from "./Box";
import DropdownComponent from "./form/Dropdown";

export enum Pronouns {
  HeHim = "He / Him",
  SheHer = "She / Her",
  TheyThem = "They / Them",
  NoPronouns = "No Pronouns",
  AnyPronouns = "Any Pronouns",
}

type FormValues = {
  handle: string;
  location: string;
  bio: string;
  email: string;
  pronouns: {
    selected: Pronouns;
    visible: boolean;
  };
  birthday: Date;
};

type UpdateProfileFuncProps = FormValues & {
  setLoading: (loading: boolean) => void;
  session: any;
};

export function logout() {
  supabase.auth.signOut();
  router.replace("/");
}

export function backToProfile() {
  router.replace("/");
}

async function updateProfile({
  setLoading,
  session,
  handle,
  location,
  bio,
  email,
  pronouns,
  birthday,
}: UpdateProfileFuncProps) {
  try {
    setLoading(true);
    if (!session?.user) throw new Error("No user on the session!");

    const { selected, visible: pronounsVisible } = pronouns;

    const updates = {
      handle: handle,
      bio,
      location,
      pronouns: selected,
      pronouns_visible: pronounsVisible,
      birthday,
      updated_at: new Date(),
    };

    console.debug("Updating profile with", birthday);

    const { error, data, statusText } = await supabase
      .from("profiles")
      .update(updates);

    if (email) {
      const { error: emailError, data: emailData } =
        await supabase.auth.updateUser({ email });

      if (emailError) {
        console.error("Error updating profile", emailError);
        throw emailError;
      }
    }

    if (error) {
      throw error;
    }

    backToProfile();
  } catch (error) {
    console.error("Error updating profile", error);
    if (error instanceof Error) {
      Alert.alert(error.message);
    }
  } finally {
    setLoading(false);
  }
}

export const UpdateProfile = ({
  session,
  userData,
}: {
  session: any;
  userData: UserData;
}) => {
  const [loading, setLoading] = React.useState(false);

  const { bio, birthday, handle, location, pronouns, pronouns_visible } =
    userData;
  console.log(session.user.email);
  return (
    <Formik
      initialValues={{
        handle: handle ?? null,
        location: location ?? null,
        bio: bio ?? null,
        email: session.user.email ?? null,
        pronouns: { selected: pronouns ?? null, visible: pronouns_visible },
        birthday: dayjs(birthday).toDate() ?? null,
      }}
      onSubmit={async (values: FormValues) =>
        await updateProfile({ setLoading, session, ...values })
      }
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
            <View style={[styles.row]}>
              <DateTimePicker
                value={values.birthday}
                accentColor={FLORAL_GRAY}
                textColor={FLORAL_GRAY}
                style={{ width: "35%", marginLeft: 0}}
                
                onChange={(val) =>
                  setFieldValue(
                    "birthday",
                    dayjs(val.nativeEvent.timestamp).toDate()
                  )
                }
              />
            </View>
          </Box>
          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <Button
              titleStyle={styles.buttonTitle}
              style={styles.button}
              color={DARK_BLUE}
              title="Save"
              disabled={loading}
              onPress={() => handleSubmit()}
            />
            <Button
              titleStyle={styles.buttonTitle}
              style={styles.button}
              color={RED}
              title="Log Out"
              disabled={loading}
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
    // alignItems: "center",
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
  buttonTitle: {
    fontFamily: REGULAR_FONT,
  },
  button: {
    width: 150,
    height: 200,
    fontFamily: REGULAR_FONT,
    paddingRight: PADDING_RL,
    paddingLeft: PADDING_RL,
  },
});
