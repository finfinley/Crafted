import { MaterialIcons } from "@expo/vector-icons";
import { Session } from "@supabase/supabase-js";
import { Link } from "expo-router";
import { BOLD_FONT, OFF_WHITE, REGULAR_FONT, SILK_CHOCOLATE } from "lib/styles";
import { isUserLoggedIn } from "lib/utils";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { supabase } from "../lib/supabase";
import ImageViewer from "./ImageViewer";

export default function Account({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      // Profile Data
      const { data, error, status } = await supabase
        .from("profiles")
        .select(`id, username, avatar_url, banner_url, location, bio`)
        .eq("id", session?.user.id) // Change this eventually
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
        setBannerUrl(data.banner_url);
        setLocation(data.location);
        setBio(data.bio);
        setId(data.id);
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
    <View style={styles.container}>
      {/* Banner */}
      <View style={styles.bannerContainer}>
        <ImageViewer
          defaultImage={{}}
          selectedImage={bannerUrl}
          styles={styles.bannerImage}
        />
      </View>
      {/* Profile */}
      <View style={styles.profileContainer}>
        {/* Profile Picture */}
        <View style={styles.profilePictureContainer}>
          <ImageViewer
            defaultImage={{}}
            selectedImage={avatarUrl}
            styles={styles.profilePicture}
          />
        </View>
        {/* Profile Details */}
        <View style={styles.profileDetailContainer}>
          {/* Main Profile Details */}
          <View>
            <Text style={styles.profileUsername}>@{username}</Text>
            <Text style={styles.profileLocation}>📍{location}</Text>
            <Text style={[styles.profileBio, styles.mt20]}>{bio}</Text>
          </View>
          {/* Level & Followers */}
          <View style={styles.microDetailsRow}>
            <View style={styles.profileMicroDetails}>
              <Text style={styles.microDetailsText}>66 Followers</Text>
              <Text style={styles.microDetailsText}>Follows 27</Text>
            </View>
            {isUserLoggedIn(session, id) && (
              <View style={styles.editColumn}>
                <Link
                  href={{ pathname: "settings" }}
                  style={{ alignSelf: "flex-end" }}
                >
                  <MaterialIcons size={22} name="edit" color={SILK_CHOCOLATE} />
                </Link>
              </View>
            )}
          </View>
        </View>
      </View>
      {/* <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input label="Email" value={session?.user?.email} disabled />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Username" value={username || ''} onChangeText={(text) => setUsername(text)} />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Website" value={website || ''} onChangeText={(text) => setWebsite(text)} />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={loading ? 'Loading ...' : 'Update'}
          onPress={() => updateProfile({ username, website, avatar_url: avatarUrl })}
          disabled={loading}
        />
      </View> */}

      {/* <View>
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
      </View> */}
    </View>
  );
}

const PADDING_RL = 8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerContainer: {
    height: "30%",
    width: "100%",
  },
  bannerImage: {
    aspectRatio: 1.5,
    resizeMode: "cover",
    height: "auto",
    width: "auto",
  },
  profileContainer: {
    backgroundColor: OFF_WHITE,
    alignSelf: "center",
    borderRadius: 8,
    width: 350,
    height: 225,
    marginTop: "40%",
    position: "absolute",
    flexDirection: "row",
  },
  profilePictureContainer: {
    width: "50%",
    alignSelf: "flex-start",
  },
  profileDetailContainer: {
    width: "50%",
    paddingTop: 10,
    height: "100%",
  },
  profileMainDetails: {
    // flex: 2
    // alignItems: 'center'
  },
  profilePicture: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    height: "100%",
    width: "100%",
  },
  profileUsername: {
    fontSize: 20,
    fontFamily: BOLD_FONT,
    alignSelf: "center",
    color: SILK_CHOCOLATE,
  },
  profileLocation: {
    fontFamily: REGULAR_FONT,
    alignSelf: "center",
  },
  profileBio: {
    fontFamily: REGULAR_FONT,
    alignSelf: "flex-start",
    paddingLeft: PADDING_RL,
  },
  microDetailsRow: {
    flexDirection: "row",
    flex: 1,
  },
  profileMicroDetails: {
    flex: 1,
    justifyContent: "flex-end",
    paddingLeft: PADDING_RL,
  },
  microDetailsText: {
    fontFamily: REGULAR_FONT,
    // color: SILK_CHOCOLATE,
  },
  editColumn: {
    flex: 1,
    justifyContent: "flex-end",
    paddingRight: 5,
  },
  mt20: {
    marginTop: 10,
  },
});
