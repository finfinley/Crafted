import { Input } from "@rneui/themed";
import { FLORAL_GRAY, HEADER_FONT, OFF_WHITE } from "lib/styles";
import { StyleSheet } from "react-native";

export default function TextInput({
  label,
  value,
  placeholder,
  icon,
  onChange,
  secure = false
}) {
  return (
    <Input
      label={label}
      leftIcon={icon}
      inputStyle={{ color: OFF_WHITE }}
      selectionColor={FLORAL_GRAY}
      onChangeText={onChange}
      value={value}
      placeholder={placeholder}
      placeholderTextColor={FLORAL_GRAY}
      autoCapitalize={"none"}
      labelStyle={styles.inputFont}
      secureTextEntry={secure}
    />
  );
}

const styles = StyleSheet.create({
  inputFont: {
    fontFamily: HEADER_FONT,
    color: FLORAL_GRAY,
    fontSize: 20,
  },
});
