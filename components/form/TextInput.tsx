import { Input } from "@rneui/themed";
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
      inputStyle={{ color: "white" }}
      selectionColor="#E4CC37"
      onChangeText={onChange}
      value={value}
      placeholder={placeholder}
      placeholderTextColor="#87919E"
      autoCapitalize={"none"}
      labelStyle={styles.inputFont}
      secureTextEntry={secure}
    />
  );
}

const styles = StyleSheet.create({
  inputFont: {
    fontFamily: "Lusitana_700Bold",
    color: "#87919E",
    fontSize: 20,
  },
});
