import { Button } from "@rneui/themed";
import { decode } from "base64-arraybuffer";
import ImageViewer from "components/ImageViewer";
import dayjs from "dayjs";
import * as ImagePicker from "expo-image-picker";
import { FLORAL_GRAY } from "lib/styles";
import { supabase } from "lib/supabase";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export function UpdateAvatar({
  avatar,
  session,
  setNewAvatar,
  loading,
  setLoading,
}: {
  avatar: string;
  session: any;
  setNewAvatar: any;
  loading: boolean;
  setLoading: any;
}) {
  const [image, setImage] = useState<string | null>(avatar);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);

  const uploadImage = async () => {
    setLoading(true);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
      base64: true,
    });

    if (!result.canceled) {
      const imageFile = result.assets[0].uri;
      const image64 = result.assets[0].base64;
      setImage(imageFile);
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(
          `public/avatar/${
            session.user.id
          }-avatar-${dayjs().toISOString()}.jpg`,
          decode(image64),
          {
            contentType: result.assets[0]?.mimeType,
            cacheControl: "3600",
            upsert: false,
          }
        );

      if (data) {
        await supabase.storage
          .from("avatars")
          .createSignedUrl(data.path, 86400 * 2000)
          .then(({ data }) => {
            setNewAvatar("avatar", data.signedUrl);
          })
          .catch((error) => {
            setLoading(false);
            console.error({ error });
            alert(
              "An error occurred while updating the image. Please try again."
            );
          });
      }

      if (error) {
        setLoading(false);
        console.error({ error });
        alert("An error occurred while uploading the image. Please try again.");
      }
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <ImageViewer
        defaultImage={{}}
        selectedImage={image}
        styles={styles.avatar}
      />
      <Button
        title={"Update Profile Picture"}
        titleStyle={{ fontSize: 14 }}
        onPress={uploadImage}
        buttonStyle={styles.button}
        color={FLORAL_GRAY}
        disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 225,
    height: 225,
    alignSelf: "center",
    alignContent: "center",
    marginTop: "2%",
    marginBottom: "5%",
  },
  avatar: {
    borderRadius: 8,
    width: 225,
    height: 225,
    marginBottom: "5%",
  },
  button: {
    alignSelf: "center", // So it doesn't stretch
  },
});
