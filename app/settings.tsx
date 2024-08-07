import { Session } from "@supabase/supabase-js";
import { UpdateProfile } from "components/UpdateProfile.form";
import { Stack } from "expo-router";
import {
  BACKGROUND_COLOR,
  OFF_WHITE,
  SILK_CHOCOLATE
} from "lib/styles";
import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { supabase } from "../lib/supabase";

export default function Settings() {
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
      <UpdateProfile />
    </View>
  );
}
