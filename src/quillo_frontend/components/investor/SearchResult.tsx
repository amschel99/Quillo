import { JSX } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ArrowRightIcon } from "../../assets/icons";
import { colors, textbold, textlight } from "../../assets/constants";

interface searchProps {}

export const SearchResult = (): JSX.Element => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={{ gap: 20 }}>
        <Text style={textbold}>Quillo</Text>
        <Text style={textlight}>2 Tokens/share</Text>
      </View>

      <View style={{ gap: 8 }}>
        <Text style={[textbold, { fontSize: 32, fontWeight: "bold" }]}>Q</Text>
        <ArrowRightIcon />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    borderWidth: 0,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: colors.divider,
    backgroundColor: colors.divider,
  },
});
