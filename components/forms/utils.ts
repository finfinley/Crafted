import { createURL } from "expo-linking";
import { router } from "expo-router";
import { supabase } from "lib/supabase";
import { Alert } from "react-native";
import { UpdateProfileFuncProps } from "./types";

export function backToProfile() {
  router.replace("/");
}

export async function updateProfile({
  setLoading,
  session,
  handle,
  location,
  bio,
  email,
  pronouns,
  birthday,
  avatar,
}: UpdateProfileFuncProps) {
  try {
    setLoading(true);
    if (!session?.user) throw new Error("No user on the session!");

    const { selected, visible: pronounsVisible } = pronouns;

    const updates = {
      avatar_url: avatar,
      handle: handle,
      bio,
      location,
      pronouns: selected,
      pronouns_visible: pronounsVisible,
      birthday,
      updated_at: new Date(),
    };
    const { error } = await supabase.from("profiles").update(updates);

    if (email) {
      const { error: emailError, data: emailData } =
        await supabase.auth.updateUser({ email });

      if (emailError) {
        console.error("Error updating profile", emailError);
        throw emailError;
      }
    }

    if (error) {
      throw error;
    }

    backToProfile();
  } catch (error) {
    console.error("Error updating profile", error);
    if (error instanceof Error) {
      Alert.alert(error.message);
    }
  } finally {
    setLoading(false);
  }
}

export async function requestPasswordLink(email: string) {
  try {
    const resetPasswordURL = createURL("/edit-profile");
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: resetPasswordURL,
    });

    if (data) {
      Alert.alert(
        `Password reset link sent to ${email}. Please check your email.`
      );
    }

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("Error requesting password link", error);
    if (error instanceof Error) {
      Alert.alert(error.message);
    }
  }
}
