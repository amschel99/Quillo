import { JSX } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation";
import CompanyHeader from "../../components/company/CompanyHeader";
import { Button } from "../../components/global/Button";
import { LaunchIcon, ArrowLeftIcon } from "../../assets/icons";
import {
  colors,
  screenstyle,
  textbold,
  textlight,
  textlightfaint,
} from "../../assets/constants";

export default function CompanyProfileScreen(): JSX.Element {
  const navigation: NativeStackNavigationProp<RootStackParamList> =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const goBack = (): void => navigation.goBack();

  return (
    <SafeAreaView style={styles.screenContainer}>
      <CompanyHeader companyName="Quillo" />

      <ScrollView>
        <Text style={styles.titles}>My Company Profile</Text>

        <Text style={styles.textFaint}>Registered name</Text>
        <Text style={styles.textdefault}>Quillo</Text>

        <Text style={styles.textFaint}>About</Text>
        <Text style={[styles.textdefault, { textAlign: "justify" }]}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
          nesciunt sunt voluptas atque autem, commodi temporibus possimus fugiat
          ab officiis! Quidem et ut expedita nesciunt necessitatibus magni,
          totam ipsa quo! Officiis commodi quae accusantium nam eos non hic
          libero harum. Quae totam cum dolorum odio dignissimos tempora
          quibusdam temporibus iure dolore voluptatum voluptatibus ratione,
          veritatis dicta iusto tenetur vero exercitationem!
        </Text>

        <Text style={styles.textFaint}>Location</Text>
        <Text style={styles.textdefault}>0012356, Nairobi, Kenya</Text>

        <Text style={styles.textFaint}>Share distribution</Text>
        <View style={[styles.row, { gap: 32 }]}>
          <View>
            <Text style={styles.textFaint}>Available shares</Text>
            <Text style={styles.textdefault}>6000000000</Text>
          </View>
          <View>
            <Text style={styles.textFaint}>Share price</Text>
            <Text style={styles.textdefault}>2 Tokens/share</Text>
          </View>
        </View>

        <Text style={styles.textFaint}>Documents</Text>

        <TouchableOpacity style={[styles.row, { marginTop: 8 }]}>
          <Text style={styles.textdefault}>See registration certificate</Text>
          <LaunchIcon />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.row, { marginTop: 8 }]}>
          <Text style={styles.textdefault}>See tax information</Text>
          <LaunchIcon />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.row, { marginTop: 8 }]}>
          <Text style={styles.textdefault}>See document of incorporation</Text>
          <LaunchIcon />
        </TouchableOpacity>

        <Text style={styles.textFaint}>Founded</Text>
        <Text style={styles.textdefault}>
          12th Feb 2014, about 10 years ago
        </Text>
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
  titles: {
    ...textbold,
    marginVertical: 8,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  textFaint: {
    ...textlightfaint,
    marginBottom: 4,
    paddingHorizontal: 10,
  },
  textdefault: {
    ...textlight,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 4,
  },
});
