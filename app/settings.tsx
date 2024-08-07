import { Session } from "@supabase/supabase-js";
import { Pronouns, UpdateProfile } from "components/UpdateProfile.form";
import { Stack } from "expo-router";
import { BACKGROUND_COLOR, OFF_WHITE, SILK_CHOCOLATE } from "lib/styles";
import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { supabase } from "../lib/supabase";

export type UserData = {
  id: string;
  avatar_url: string;
  banner_url: string;
  location: string;
  bio: string;
  handle: string;
  pronouns: Pronouns;
  pronouns_visible: boolean;
  birthday: string;
};

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [data, setData] = useState<UserData | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      // Profile Data
      const { data, error, status } = await supabase
        .from("profiles")
        .select(
          `id, avatar_url, banner_url, location, bio, handle, pronouns, pronouns_visible, birthday`
        )
        .eq("id", session?.user.id) // Change this eventually
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setData(data);
      }
    } catch (error) {
      console.error({ error });
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  if (data) {
    return (
      <View style={{ backgroundColor: BACKGROUND_COLOR, height: "100%" }}>
        <Stack.Screen
          options={{
            title: "Edit Profile",
            headerTintColor: OFF_WHITE,
            headerStyle: { backgroundColor: SILK_CHOCOLATE },
          }}
        />
        <UpdateProfile session={session} userData={data} />
      </View>
    );
  }
}
