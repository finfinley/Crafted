import { UserData } from "app/settings";
import CraftedButton from "components/buttons/CraftedButton";
import { UpdateAvatarForm } from "components/forms/UpdateAvatar.form";
import { UpdateProfileForm } from "components/forms/UpdateProfile.form";
import { ProfileFormValues } from "components/forms/types";
import { updateProfile } from "components/forms/utils";
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
          {/* Buttons */}
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
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  buttonContainer: {
    marginTop: "5%",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonTitle: {
    fontFamily: REGULAR_FONT,
  },
  button: {
    width: 150,
    height: 200,
    fontFamily: REGULAR_FONT,
    paddingRight: PADDING_RL,
    paddingLeft: PADDING_RL,
  },
});
