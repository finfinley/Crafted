import Box from "@Box";
import { Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";

type DrinkCardProps = {
    name: string
}

export const DrinkCard: React.FC = () => {
  return (
    <Box>
      <View style={styles.row}>
        <Text>Drink Card</Text>
      </View>
    </Box>
  );
};

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    flexDirection: "row",
  },
});
