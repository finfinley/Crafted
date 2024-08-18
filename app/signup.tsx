import { Stack } from "expo-router";
import { BACKGROUND_COLOR, SILK_CHOCOLATE } from "lib/styles";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Signup } from "screens/Signup";

const SignUp = () => {
  
  return (
    <ScrollView style={{ backgroundColor: BACKGROUND_COLOR, height: "100%" }}>
      <Stack.Screen
        options={{
          title: "Edit Profile",
          headerTintColor: "white",
          headerStyle: { backgroundColor: SILK_CHOCOLATE },
        }}
      />
     <Signup />
    </ScrollView>
  );
};

export default SignUp;
