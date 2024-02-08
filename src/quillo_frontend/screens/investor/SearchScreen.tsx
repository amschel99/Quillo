import { JSX, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation";
import { Button } from "../../components/global/Button";
import { SearchResult } from "../../components/investor/SearchResult";
import { ArrowLeftIcon, SearchIcon } from "../../assets/icons";
import { colors, screenstyle, textbold } from "../../assets/constants";

export default function SearchScreen(): JSX.Element {
  const [companyName, setCompanyName] = useState<string>("");

  const navigation: NativeStackNavigationProp<RootStackParamList> =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const goBack = (): void => navigation.goBack();

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.searchinputctr}>
        <TextInput
          placeholder="Search for companies..."
          placeholderTextColor={colors.text_secondary}
          style={styles.searchinput}
          value={companyName}
          onChangeText={(text) => setCompanyName(text)}
        />
        <SearchIcon />
      </View>

      <ScrollView style={{ marginTop: 16 }}>
        <SearchResult />
      </ScrollView>

      <Button
        dpText="Go back"
        dpIcon={<ArrowLeftIcon iconColor={colors.text_primary} />}
        isDisabled={false}
        onPressFunc={goBack}
        xstyles={{ flexDirection: "row-reverse", borderRadius: 0 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    ...screenstyle,
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  searchinputctr: {
    padding: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 0,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: colors.divider,
    backgroundColor: colors.divider,
  },
  searchinput: {
    ...textbold,
    width: "88%",
    fontSize: 14,
    color: colors.text_primary,
  },
});
