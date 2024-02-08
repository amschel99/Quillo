import { JSX } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import {
  SCREENHEIGH,
  colors,
  textbold,
  textlight,
} from "../../assets/constants";

interface createCompnayHeaderProps {
  currSection: number;
}

export const CreateCompanyHeader = ({
  currSection,
}: createCompnayHeaderProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.sectionctr}>
        <Text style={[textlight, styles.sectioncount]}>1</Text>
        <Text style={[textbold, styles.sectiontitle]}>Basic Info</Text>
      </View>

      <View style={styles.sectionctr}>
        <Text style={[textlight, styles.sectioncount]}>2</Text>
        <Text
          style={[
            textbold,
            styles.sectiontitle,
            {
              color:
                currSection >= 2 ? colors.text_primary : colors.text_secondary,
            },
          ]}
        >
          Tokenization
        </Text>
      </View>

      <View style={styles.sectionctr}>
        <Text style={[textlight, styles.sectioncount]}>3</Text>
        <Text
          style={[
            textbold,
            styles.sectiontitle,
            {
              color:
                currSection == 3 ? colors.text_primary : colors.text_secondary,
            },
          ]}
        >
          Documentation
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  sectionctr: {
    gap: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  sectioncount: {
    width: 32,
    height: 32,
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 500,
    backgroundColor: colors.divider,
    color: colors.text_primary,
  },
  sectiontitle: {
    fontSize: 12,
    color: colors.text_primary,
  },
});
