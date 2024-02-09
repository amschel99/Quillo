import { JSX } from "react";
import { StyleSheet, ScrollView, View, TextInput, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation";
import { AppHeader } from "../../components/global/AppHeader";
import { KeyBoardComponent } from "../../components/global/KeyBoardComponent";
import { screenstyle, textbold } from "../../assets/constants";

type buysharesProps = NativeStackScreenProps<RootStackParamList, "buyshares">;

export default function BuySharesScreen({
  route,
  navigation,
}: buysharesProps): JSX.Element {
  const { companyId } = route.params;

  const goBack = (): void => navigation.goBack();

  return (
    <SafeAreaView style={styles.screenContainer}>
      <AppHeader renderSearch={true} />

      <ScrollView>
        <Text style={textbold}>Get Quillo Shares</Text>
        <KeyBoardComponent />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    ...screenstyle,
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
});
