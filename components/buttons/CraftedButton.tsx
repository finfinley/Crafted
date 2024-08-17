import { Button } from "@rneui/themed";
import { DARK_BLUE, PADDING_RL, RED, REGULAR_FONT } from "lib/styles";
import React from "react";
import { StyleSheet } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading: boolean;
  danger?: boolean;
  buttonStyles?: any;
}

const CraftedButton: React.FC<ButtonProps> = ({
  title,
  danger,
  onPress,
  loading,
  buttonStyles,
}) => {
  const color = danger ? RED : DARK_BLUE;
  return (
    <Button
      titleStyle={styles.buttonTitle}
      style={buttonStyles ?? styles.button}
      color={color}
      title={title}
      disabled={loading}
      onPress={() => onPress()}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    width: 200,
    fontFamily: REGULAR_FONT,
    paddingRight: PADDING_RL,
    paddingLeft: PADDING_RL,
  },
  buttonTitle: {
    fontFamily: REGULAR_FONT,
  },
});

export default CraftedButton;
