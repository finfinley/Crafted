import { Button } from "@rneui/themed";
import { router } from "expo-router";
import { useSession } from "lib/ctx";
import {
  CURSIVE_FONT,
  DARK_BLUE,
  GRAY,
  HEADER_FONT,
  LIGHT_GRAY,
  PALE_YELLOW,
} from "lib/styles";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import TextInput from "components/input/TextInput";
import Logo from "components/Logo";

export default function Login() {
  const { login, loading } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Logo />
      <View style={[styles.row, styles.mt20]}>
        <TextInput
          label="Email"
          icon={{
            name: "email",
            color: LIGHT_GRAY,
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
            name: "lock",
            color: LIGHT_GRAY,
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
        color={DARK_BLUE}
        title="Sign in"
        disabled={loading}
        onPress={() => {
          login(email, password);
          router.replace("/");
        }}
      />
      <Button
        titleStyle={styles.title}
        color={GRAY}
        style={[styles.button]}
        title="Sign up"
        disabled={loading}
        onPress={() => {
          // signUp(email, password);
          router.replace("/signup");
        }}
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
    fontFamily: HEADER_FONT,
  },
});
