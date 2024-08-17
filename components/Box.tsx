import {
  BACKGROUND_COLOR,
  HEADER_FONT,
  OFF_WHITE,
  SILK_CHOCOLATE,
} from "lib/styles";
import { StyleSheet, Text, View } from "react-native";

export default function Box({ title, children }) {
  return (
    <View style={styles.profileDetailContainer}>
      <View style={styles.containerHeader}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

const PADDING_RL = 8;

const styles = StyleSheet.create({
  containerHeader: {
    flexDirection: "column",
    alignItems: "flex-end",
    width: "100%",
  },
  headerText: {
    fontFamily: HEADER_FONT,
    color: BACKGROUND_COLOR
  },

  profileDetailContainer: {
    backgroundColor: OFF_WHITE,
    alignSelf: "center",
    borderRadius: 3,
    width: 400,
    marginTop: "10%",
    paddingTop: 3,
    paddingLeft: PADDING_RL,
    paddingRight: PADDING_RL,
  },
});
