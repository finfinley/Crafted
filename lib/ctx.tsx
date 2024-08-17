import { Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert, AppState } from "react-native";
import { supabase } from "./supabase";
import { SplashScreen } from "expo-router";

SplashScreen.preventAutoHideAsync();

type AuthContextType = {
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => void;
  signUp: (email: string, password: string) => void;
};

/**
 * Use the current user session.
 * 
 * @returns AuthContextType: session, loading, login, signUp
 */
export function useSession(): AuthContextType {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: false,
  login: null,
  signUp: null,
});

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export function AuthProvider({ children }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);

  /**
   * Login the user.
   *
   * @param email User email
   * @param password User password
   */
  async function login(email: string, password: string) {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    }

    setLoading(false);
  }

  /**
   * Sign up the new user 🤑
   *
   * @param email User sign up email
   * @param password User entered password
   */
  async function signUp(email: string, password: string) {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.log({ error });
      Alert.alert(error.message);
    }

    if (!session && !error)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ session, loading, login, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}
