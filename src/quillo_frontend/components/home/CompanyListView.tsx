import { JSX } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { CompanyPreview } from "./CompanyPreview";
import { SCREENHEIGH, textbold } from "../../assets/constants";

export interface Company {
  name: string;
  token: number;
  description: string;
}

export interface CompanyListViewProps {
  listTitle: string;
  companiesArray: Company[];
}

export const CompanyListView = ({
  listTitle,
  companiesArray,
}: CompanyListViewProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={{ ...textbold, fontSize: 18 }}>{listTitle}</Text>

      <ScrollView style={styles.companyListContainer}>
        {companiesArray.map((company, index) => (
          <View key={index} style={styles.company}>
            <CompanyPreview company={company} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    gap: 8,
  },
  companyListContainer: {
    height: SCREENHEIGH * 0.35,
    display: "flex",
    flexDirection: "column",
    paddingBottom: 20,
    gap: 8,
  },
  company: {
    marginVertical: 8,
  },
});
