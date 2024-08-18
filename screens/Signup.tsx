import { SignupForm } from "@forms/Signup.form";
import { Button } from "@rneui/themed";
import { router } from "expo-router";
import { Formik } from "formik";
import { useSession } from "lib/ctx";
import { DARK_BLUE, GRAY, HEADER_FONT } from "lib/styles";
import React from "react";
import { StyleSheet, View } from "react-native";

export type SignupFormValues = {
  email: string;
  handle: string;
  location: string;
  birthday: Date;
  password: string;
  confirmPassword: string;
};

export const Signup: React.FC = () => {
  const { signup, loading } = useSession();

  return (
    <Formik
      initialValues={{
        email: null,
        handle: null,
        location: null,
        birthday: null,
        password: null,
        confirmPassword: null,
      }}
      onSubmit={async (values: SignupFormValues) =>
        signup(values.email, values.password)
      }
    >
      {(formContext) => (
        <View>
          <SignupForm formContext={formContext} />
          <Button
            titleStyle={styles.buttonTitle}
            style={styles.button}
            color={DARK_BLUE}
            title="Sign Up"
            disabled={loading}
            onPress={() => {
              // login(email, password);
              router.replace("/");
            }}
          />
          <Button
            titleStyle={styles.buttonTitle}
            color={GRAY}
            style={[styles.button]}
            title="Return to Login"
            disabled={loading}
            onPress={() => {
              router.replace("/login");
            }}
          />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: "stretch",
    paddingBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
  },
  buttonTitle: {
    fontFamily: HEADER_FONT,
  },
});
