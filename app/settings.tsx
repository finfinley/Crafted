import DateTimePicker from "@react-native-community/datetimepicker";
import { CheckBox, Input } from "@rneui/themed";
import Box from "components/Box";
import DropdownComponent from "components/form/Dropdown";
import dayjs from "dayjs";
import { Stack } from "expo-router";
import {
  BACKGROUND_COLOR,
  BOLD_FONT,
  OFF_WHITE,
  SILK_CHOCOLATE,
  TAN_GRAY,
} from "lib/styles";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";

export default function Settings() {
  const twentyOneYearsAgo = dayjs(new Date()).subtract(21, "years").toDate();
  const [checked, setChecked] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string;
    website: string;
    avatar_url: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

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
            labelStyle={styles.inputLabel}
            inputStyle={[styles.inputFont]}
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
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "50%" }}>
            <DropdownComponent />
          </View>
          <View>
            <CheckBox
              size={18}
              containerStyle={{ backgroundColor: OFF_WHITE, padding: 0 }}
              title="Visible on Profile"
              checked={checked}
              onPress={() => setChecked(!checked)}
              textStyle={[styles.inputLabel, { marginLeft: 3 }]}
              checkedColor={SILK_CHOCOLATE}
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
              value={twentyOneYearsAgo}
              accentColor="#87919E"
              textColor="#87919E"
            />
          </View>
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
    color: "#87919E",
    fontSize: 14,
  },
  pronouns: {
    // flexDirection: "row",
  },
  datePickerLabel: {
    paddingLeft: 10,
    paddingBottom: 2,
  },
});
