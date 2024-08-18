import { SignupFormValues } from "@Signup";
import DateTimePicker from "@react-native-community/datetimepicker";
import Logo from "components/Logo";
import TextInput from "components/input/TextInput";
import dayjs from "dayjs";
import { FormikProps } from "formik";
import {
  FLORAL_GRAY,
  HEADER_FONT,
  LIGHT_GRAY
} from "lib/styles";
import { StyleSheet, Text, View } from "react-native";

type SignupFormProps = {
  formContext: FormikProps<SignupFormValues>;
};

export const SignupForm: React.FC<SignupFormProps> = ({ formContext }) => {
  const { handleBlur, handleChange, values, setFieldValue } = formContext;

  return (
    <View style={styles.container}>
      <Logo logoText="Welcome to Crafted." />
      <View style={[styles.row, styles.mt20]}>
        <TextInput
          label="Email"
          icon={{
            name: null,
            color: LIGHT_GRAY,
          }}
          placeholder={"goodspirits@email.com"}
          onChange={handleChange("email")}
          value={values.email}
        />
      </View>
      <View style={[styles.row]}>
        <TextInput
          label="Handle"
          icon={{
            name: null,
            color: LIGHT_GRAY,
          }}
          placeholder={"@goodspirits"}
          onChange={handleChange("handle")}
          value={values.handle}
        />
      </View>
      <View style={[styles.row]}>
        <TextInput
          label="Location"
          icon={{
            name: null,
            color: LIGHT_GRAY,
          }}
          placeholder="New York, NY"
          onChange={handleChange("location")}
          value={values.location}
        />
      </View>
      <View style={[styles.row]}>
        <Text style={[styles.inputFont, styles.datePickerLabel]}>
          Birthday:
        </Text>
      </View>
      <View style={[styles.row, { paddingBottom: 25 }]}>
        <DateTimePicker
          value={new Date()}
          accentColor={FLORAL_GRAY}
          textColor={FLORAL_GRAY}
          style={{ width: "35%", marginLeft: 0 }}
          onChange={(val) =>
            setFieldValue("birthday", dayjs(val.nativeEvent.timestamp).toDate())
          }
        />
      </View>
      <View style={styles.row}>
        <TextInput
          label="Password"
          icon={{
            name: null,
            color: LIGHT_GRAY,
          }}
          placeholder="Password"
          onChange={handleChange("password")}
          value={values.password}
          secure
        />
      </View>
      <View style={styles.row}>
        <TextInput
          label="Confirm Password"
          icon={{
            name: null,
            color: LIGHT_GRAY,
          }}
          placeholder="Confirm Password"
          onChange={handleChange("confirmPassword")}
          value={values.confirmPassword}
          secure
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 50,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
  },
  inputFont: {
    fontFamily: HEADER_FONT,
    color: FLORAL_GRAY,
    fontSize: 20,
  },
  datePickerLabel: {
    paddingLeft: 10,
    paddingBottom: 2,
  },
  button: {
    alignSelf: "stretch",
    paddingBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
  },
  mt20: {
    marginTop: 20,
  },
  title: {
    fontFamily: HEADER_FONT,
  },
});
