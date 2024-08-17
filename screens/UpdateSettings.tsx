import CraftedButton from "components/buttons/CraftedButton";
import { UpdatePasswordForm } from "components/forms/UpdatePassword.form";
import { Formik } from "formik";
import { PADDING_RL, REGULAR_FONT } from "lib/styles";
import { StyleSheet, View } from "react-native";

export const UpdateSettings = ({}) => {
  return (
    <Formik
      initialValues={null}
      onSubmit={async (values: any) => console.log("Submitting from settings")}
    >
      <View>
        <UpdatePasswordForm />
        <View style={styles.buttonContainer}>
          <CraftedButton
            title="Change Password"
            onPress={() => console.log("pressed")}
            loading={false}
          />
            <CraftedButton
              title={"Delete Account"}
              onPress={() => console.log("pressed")}
              loading={false}
              danger
            />
        </View>
      </View>
    </Formik>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: "5%",
    flexDirection: "row",
    justifyContent: "center",
  },
});
