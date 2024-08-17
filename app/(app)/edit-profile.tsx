import { Pronouns } from "components/forms/types";
import { UpdateProfile } from "components/sections/UpdateProfile";
import { Stack } from "expo-router";
import { useSession } from "lib/ctx";
import { BACKGROUND_COLOR, SILK_CHOCOLATE } from "lib/styles";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import "react-native-gesture-handler";
import { ScrollView } from "react-native-gesture-handler";
import { supabase } from "../../lib/supabase";

export type UserData = {
  id: string;
  avatar_url: string;
  location: string;
  bio: string;
  handle: string;
  pronouns: Pronouns;
  pronouns_visible: boolean;
  birthday: string;
};

export default function EditProfile() {
  const [loading, setLoading] = useState(true);
  const { session } = useSession();
  const [data, setData] = useState<UserData | null>(null);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      // Profile Data
      const { data, error, status } = await supabase
        .from("profiles")
        .select(
          `id, avatar_url, location, bio, handle, pronouns, pronouns_visible, birthday`
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

  if (loading) {
    return null;
  }

  if (data) {
    return (
      <ScrollView style={{ backgroundColor: BACKGROUND_COLOR, height: "100%" }}>
        <Stack.Screen
          options={{
            title: "Edit Profile",
            headerTintColor: "white",
            headerStyle: { backgroundColor: SILK_CHOCOLATE },
          }}
        />
        <UpdateProfile session={session} userData={data} />
      </ScrollView>
    );
  }
}
