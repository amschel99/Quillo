import { JSX } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { ArrowRightIcon, LetterQicon } from "../../assets/icons";
import { textlight, textbold, colors } from "../../assets/constants";

export type company = {
  name: string;
  token: number;
  description: string;
  isLast?: boolean;
};

export const CompanyPreview = ({
  name,
  token,
  description,
  isLast,
}: company): JSX.Element => {
  return (
    <TouchableOpacity
      style={[styles.container, { marginBottom: isLast ? 54 : 6 }]}
    >
      <View style={styles.leftSide}>
        <Text style={{ ...textbold, fontSize: 14 }}>{name}</Text>

        <View style={{ gap: 8 }}>
          <Text style={textlight}>{token} Tokens/Share</Text>
          <Text style={textlight}>{description}</Text>
        </View>
      </View>

      <View style={styles.rightSide}>
        <Text style={[textbold, { fontSize: 32, fontWeight: "bold" }]}>
          {name[0]}
        </Text>

        <ArrowRightIcon />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 99,
    marginVertical: 6,
    padding: 8,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.secondary,
  },
  leftSide: {
    justifyContent: "space-between",
  },
  rightSide: {
    justifyContent: "space-between",
  },
});
