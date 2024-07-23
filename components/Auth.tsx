import React, { useState } from "react";
import { Alert, StyleSheet, View, AppState, Text } from "react-native";
import { supabase } from "../lib/supabase";
import { Button, Header, Input } from "@rneui/themed";
import TextInput from "./form/TextInput";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    }

    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.log({ error });
      Alert.alert(error.message);
    }

    if (!session && !error)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            fontSize: 48,
            fontFamily: "Lusitana_700Bold",
            color: "#E4CC37",
          }}
        >
          Crafted.
        </Text>
      </View>
      <View style={[styles.row, styles.mt20]}>
        <TextInput
          label="Email"
          icon={{
            type: "font-awesome",
            name: "envelope",
            color: "#707078",
          }}
          onChange={(text) => setEmail(text)}
          placeholder="goodspirits@email.com"
          value={email}
        />
      </View>
      <View style={styles.row}>
        <TextInput
          label="Password"
          icon={{
            type: "font-awesome",
            name: "lock",
            color: "#707078",
          }}
          onChange={(text) => setPassword(text)}
          placeholder="Password"
          value={password}
          secure
        />
      </View>
      <Button
        titleStyle={styles.title}
        style={styles.button}
        color="#707078"
        title="Sign in"
        disabled={loading}
        onPress={() => signInWithEmail()}
      />
      <Button
        titleStyle={styles.title}
        color="#87919E"
        style={[styles.button]}
        title="Sign up"
        disabled={loading}
        onPress={() => signUpWithEmail()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
    justifyContent: "center",
    alignContent: "center",
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
  },
  button: {
    alignSelf: "stretch",
    paddingBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
  },
  mt20: {
    marginTop: 20,
  },
  title: {
    fontFamily: "Lusitana_400Regular",
  },
});
