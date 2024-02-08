import { JSX } from "react";
import { StyleSheet, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppHeader } from "../../components/global/AppHeader";
import { company, CompanyPreview } from "../../components/home/CompanyPreview";
import { LogOut } from "../../components/global/LogOut";
import { screenstyle, textbold } from "../../assets/constants";

const mycompanies: company[] = [
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

export default function InvestorHomeScreen(): JSX.Element {
  return (
    <SafeAreaView style={styles.screenContainer}>
      <AppHeader renderSearch={true} />

      <ScrollView>
        <Text style={styles.titles}>My Investments</Text>
        {mycompanies.map((company, idx) => (
          <CompanyPreview
            key={idx}
            name={company.name}
            token={company.token}
            description={company.description}
          />
        ))}

        <Text style={styles.titles}>Other Companies</Text>
        {mycompanies.map((company, idx) => (
          <CompanyPreview
            key={idx}
            name={company.name}
            token={company.token}
            description={company.description}
            isLast={idx == mycompanies.length - 1}
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
    marginVertical: 16,
    paddingHorizontal: 10,
    fontSize: 14,
  },
});
