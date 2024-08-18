import { DrinkCard as DrinkCardTest } from "@DrinkCard";
import { Stack } from "expo-router";
import { BACKGROUND_COLOR, SILK_CHOCOLATE } from "lib/styles";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Signup } from "screens/Signup";

const DrinkCard: React.FC = () => {
  
  return (
    <ScrollView style={{ backgroundColor: BACKGROUND_COLOR, height: "100%" }}>
      <Stack.Screen
        options={{
          title: "DRINK CARD TEST BC I HAVE NO WIFI",
          headerTintColor: "white",
          headerStyle: { backgroundColor: SILK_CHOCOLATE },
        }}
      />
     <DrinkCardTest />
    </ScrollView>
  );
};

export default DrinkCard;