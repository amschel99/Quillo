import { JSX } from "react";
import { StyleSheet, View, Text } from "react-native";
import { colors, textlight, textlightfaint } from "../../assets/constants";

export type investorType = {
  id: string;
  sharesOwned: number;
  tokens: number;
  dateAcquired: string;
  isLast?: boolean;
};

export const Investor = ({
  id,
  sharesOwned,
  tokens,
  dateAcquired,
  isLast,
}: investorType): JSX.Element => {
  return (
    <View style={[styles.container, { marginBottom: isLast ? 48 : 6 }]}>
      <Text style={textlightfaint}>
        {id[0]}***{id[id.length - 1]}
      </Text>

      <View style={styles.row}>
        <Text style={textlight}>
          {sharesOwned} shares - {tokens} tokens
        </Text>

        <Text style={textlightfaint}>{dateAcquired}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    paddingHorizontal: 10,
    borderWidth: 0,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    gap: 10,
    borderColor: colors.divider,
    backgroundColor: colors.divider,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
