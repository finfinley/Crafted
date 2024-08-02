import { Session } from "@supabase/supabase-js";
import * as SplashScreen from "expo-splash-screen";
import { BACKGROUND_COLOR, OFF_WHITE } from "lib/styles";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Account from "../components/Account";
import Auth from "../components/Auth";
import { supabase } from "../lib/supabase";

SplashScreen.preventAutoHideAsync();

export default function App() {
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
    <View style={styles.container}>
      {session && session.user ? (
        <Account key={session.user.id} session={session} />
      ) : (
        <Auth />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    color: OFF_WHITE,
  },
});
