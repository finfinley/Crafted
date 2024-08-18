import { CURSIVE_FONT, PALE_YELLOW } from "lib/styles";
import { Text, View } from "react-native";

type LogoProps = {
  logoText?: string;
};

/**
 * The default app logo
 *
 * @param {string} logoText Defaults to Crafted
 * @returns Logo component
 */
export const Logo: React.FC<LogoProps> = ({ logoText = "Crafted" }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Text
        style={{
          fontSize: 56,
          fontFamily: CURSIVE_FONT,
          color: PALE_YELLOW,
          textAlign: "center",
        }}
      >
        {logoText}
      </Text>
    </View>
  );
};

export default Logo;
