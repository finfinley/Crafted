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
