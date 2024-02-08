import { JSX } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Company } from "./CompanyListView";
import { ArrowRightIcon, LetterQicon } from "../../assets/icons";
import { textlight, textbold, colors } from "../../assets/constants";

export interface CompanyListViewProps {
  company: Company;
}

export const CompanyPreview = ({
  company,
}: CompanyListViewProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSide}>
        <Text style={{ ...textbold, fontSize: 18 }}>{company.name}</Text>

        <View style={{ display: "flex", gap: 8 }}>
          <Text style={textlight}>{company.token} Tokens/Share</Text>
          <Text style={textlight}>{company.description}</Text>
        </View>
      </View>

      <View style={styles.rightSide}>
        <TouchableOpacity>
          <LetterQicon />
        </TouchableOpacity>

        <TouchableOpacity>
          <ArrowRightIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 99,
    padding: 8,
    display: "flex",
    flexDirection: "row",
    backgroundColor: colors.secondary,
    justifyContent: "space-between",
  },
  leftSide: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  rightSide: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
