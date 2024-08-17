import { MaterialIcons } from "@expo/vector-icons";
import { Session } from "@supabase/supabase-js";
import { Link } from "expo-router";
import {
  BOLD_REG_FONT,
  HEADER_FONT,
  LIGHT_REG_FONT,
  OFF_WHITE,
  REGULAR_FONT,
  SILK_CHOCOLATE
} from "lib/styles";
import { isUserLoggedIn } from "lib/utils";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { supabase } from "../lib/supabase";
import ImageViewer from "../components/ImageViewer";

export default function Profile({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true);
  const [handle, setHandle] = useState();
  const [avatarUrl, setAvatarUrl] = useState();
  const [bannerUrl, setBannerUrl] = useState();
  const [bio, setBio] = useState();
  const [location, setLocation] = useState();
  const [id, setId] = useState();
  const [pronouns, setPronouns] = useState();
  const [pronounsVisible, setPronounsVisible] = useState();

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
        .select(
          `id, handle, avatar_url, banner_url, location, bio, pronouns, pronouns_visible`
        )
        .eq("id", session?.user.id) // Change this eventually
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setHandle(data.handle);
        setPronouns(data.pronouns);
        setPronounsVisible(data.pronouns_visible);
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
            <Text style={styles.profileHandle}>@{handle}</Text>
            {pronounsVisible && (
              <Text style={styles.profilePronouns}>{pronouns}</Text>
            )}
            <Text style={styles.profileLocation}>📍{location}</Text>
            <Text style={[styles.profileBio, styles.mt20]}>{bio}</Text>
          </View>
          {/* Level & Followers */}
          <View style={styles.microDetailsRow}>
            <View style={styles.profileMicroDetails}>
              <Text style={styles.microDetailsText}>66 Followers</Text>
              <Text style={styles.microDetailsText}>27 Following</Text>
            </View>
            {isUserLoggedIn(session, id) && (
              <View style={styles.editColumn}>
                <Link
                  href={{ pathname: "edit-profile" }}
                  style={{ alignSelf: "flex-end" }}
                >
                  <MaterialIcons size={22} name="edit" color={SILK_CHOCOLATE} />
                </Link>
              </View>
            )}
          </View>
        </View>
      </View>
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
  profileHandle: {
    fontSize: 20,
    fontFamily: HEADER_FONT,
    alignSelf: "center",
    color: SILK_CHOCOLATE,
  },
  profilePronouns: {
    paddingTop: 0,
    fontFamily: LIGHT_REG_FONT,
    alignSelf: "center",
    fontSize: 12,
  },
  profileLocation: {
    fontFamily: BOLD_REG_FONT,
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
    fontFamily: LIGHT_REG_FONT,
    fontSize: 12,
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
