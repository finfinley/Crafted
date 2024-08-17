import { Session } from "@supabase/supabase-js";
import { UpdateSettings } from "components/sections/UpdateSettings";
import { Stack } from "expo-router";
import { BACKGROUND_COLOR, SILK_CHOCOLATE } from "lib/styles";
import { supabase } from "lib/supabase";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";

export default function Settings() {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <ScrollView style={{ backgroundColor: BACKGROUND_COLOR, height: "100%" }}>
      <Stack.Screen
        options={{
          title: "Settings",
          headerTintColor: "white",
          headerStyle: { backgroundColor: SILK_CHOCOLATE },
        }}
      />
      <UpdateSettings />
    </ScrollView>
  );
}
