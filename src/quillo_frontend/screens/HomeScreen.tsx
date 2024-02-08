import React, { JSX } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppHeader } from "../components/global/AppHeader";
import { colors } from "../assets/constants";
import { Company, CompanyListView } from "../components/home/CompanyListView";

const companyListViewProps: Company[] = [
  {
    name: "Quillo",
    token: 3,
    description: "1,000 Owned Shares or 400 Quillo Tokens",
  },
  {
    name: "Tefro",
    token: 6,
    description: "1,000 Owned Shares or 400 Quillo Tokens",
  },
  {
    name: "Umbrella",
    token: 5,
    description: "1,000 Owned Shares or 400 Quillo Tokens",
  },
];

export default function HomeScreen(): JSX.Element {
  return (
    <SafeAreaView style={styles.screenContainer}>
      <View>
        <AppHeader renderSearch={true} />
        <CompanyListView
          companiesArray={companyListViewProps}
          listTitle="My Investments"
        />
      </View>
      <CompanyListView
        companiesArray={companyListViewProps}
        listTitle="Other Companies"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    display: "flex",
    gap: 24,
  },
});
