import { Session } from "@supabase/supabase-js";
import * as SplashScreen from "expo-splash-screen";
import { BACKGROUND_COLOR, OFF_WHITE } from "lib/styles";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Profile from "../components/Profile";
import Login from "../components/Login";
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
        <Profile key={session.user.id} session={session} />
      ) : (
        <Login />
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
