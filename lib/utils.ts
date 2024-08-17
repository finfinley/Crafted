import { Session } from "@supabase/supabase-js";
import { supabase } from "./supabase";
import { router } from "expo-router";

/**
 * Determines if user is logged in by using the session
 *
 * @param session The user session
 * @param id ID to compare
 * @returns True if session ID matches ID
 */
export const isUserLoggedIn = (session: Session, id: string): boolean =>
  session.user.id === id;

export function logout() {
  supabase.auth.signOut();
  router.replace("/");
}

export function goToSettings() {
  router.replace("/settings");
}
