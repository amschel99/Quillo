import { JSX } from "react";
import { StyleSheet, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CompanyHeader from "../../components/company/CompanyHeader";
import { investorType, Investor } from "../../components/company/Investor";
import { LogOut } from "../../components/global/LogOut";
import { screenstyle, textbold } from "../../assets/constants";

const myinvestors: investorType[] = [
  {
    id: "1298718927",
    sharesOwned: 234565,
    tokens: 1389,
    dateAcquired: "10 days ago",
  },
  {
    id: "1298718927",
    sharesOwned: 234565,
    tokens: 1389,
    dateAcquired: "10 days ago",
  },
  {
    id: "1298718927",
    sharesOwned: 234565,
    tokens: 1389,
    dateAcquired: "10 days ago",
  },
  {
    id: "1298718927",
    sharesOwned: 234565,
    tokens: 1389,
    dateAcquired: "10 days ago",
  },
];

export default function CompanyHomeScreen(): JSX.Element {
  return (
    <SafeAreaView style={styles.screenContainer}>
      <CompanyHeader companyName="Quillo" />

      <ScrollView>
        <Text style={styles.titles}>My Investors</Text>

        {myinvestors.map((investor, idx) => (
          <Investor
            key={idx}
            id={investor.id}
            sharesOwned={investor.sharesOwned}
            tokens={investor.tokens}
            dateAcquired={investor.dateAcquired}
          />
        ))}
      </ScrollView>

      <LogOut />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    ...screenstyle,
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  titles: {
    ...textbold,
    marginVertical: 8,
    paddingHorizontal: 10,
    fontSize: 14,
  },
});
