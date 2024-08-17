import { UserData } from "app/edit-profile";
import CraftedButton from "components/buttons/CraftedButton";
import { UpdateAvatarForm } from "components/forms/UpdateAvatar.form";
import { UpdateProfileForm } from "components/forms/UpdateProfile.form";
import { ProfileFormValues } from "components/forms/types";
import { requestPasswordLink, updateProfile } from "components/forms/utils";
import dayjs from "dayjs";
import { Formik } from "formik";
import { PADDING_RL, REGULAR_FONT } from "lib/styles";
import { logout } from "lib/utils";
import React from "react";
import { StyleSheet, View } from "react-native";

export const UpdateProfile = ({
  session,
  userData,
}: {
  session: any;
  userData: UserData;
}) => {
  const [loading, setLoading] = React.useState(false);

  const {
    bio,
    birthday,
    handle,
    location,
    pronouns,
    pronouns_visible,
    avatar_url,
  } = userData;

  return (
    <Formik
      initialValues={{
        avatar: avatar_url,
        handle: handle ?? null,
        location: location ?? null,
        bio: bio ?? null,
        email: session.user.email ?? null,
        pronouns: { selected: pronouns ?? null, visible: pronouns_visible },
        birthday: dayjs(birthday).toDate() ?? null,
      }}
      onSubmit={async (values: ProfileFormValues) =>
        await updateProfile({ setLoading, session, ...values })
      }
    >
      {(formContext) => (
        <View>
          <UpdateAvatarForm
            setNewAvatar={formContext.setFieldValue}
            session={session}
            avatar={formContext.values.avatar}
            loading={loading}
            setLoading={setLoading}
          />
          <UpdateProfileForm formContext={formContext} />
          {/* Profile Detail Buttons */}
          <View style={styles.buttonContainer}>
            <CraftedButton
              title={"Save"}
              onPress={formContext.handleSubmit}
              loading={loading}
            />
            <CraftedButton
              title={"Log Out"}
              onPress={logout}
              loading={loading}
              danger
            />
          </View>
          {/* Danger Zone */}

          <View style={styles.buttonContainer}>
            <CraftedButton
              title={"Request Password Reset"}
              onPress={() => requestPasswordLink(session.user.email)}
              loading={loading}
              buttonStyles={[styles.dangerButton, styles.w300]}
            />
          </View>
          <View style={styles.buttonContainer}>
            <CraftedButton
              title={"Delete Account"}
              onPress={() => console.log("Delete Account")}
              loading={loading}
              danger
              buttonStyles={[styles.dangerButton, styles.w300, styles.h200]}
            />
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  w300: {
    width: 400,
  },
  h200: {
    height: 200,
  },
  buttonContainer: {
    marginTop: "5%",
    flexDirection: "row",
    justifyContent: "center",
  },
  dangerButton: {
    fontFamily: REGULAR_FONT,
    paddingRight: PADDING_RL,
    paddingLeft: PADDING_RL,
  },
});
