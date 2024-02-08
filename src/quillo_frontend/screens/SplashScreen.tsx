import { JSX } from "react";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation";
import { AppHeader } from "../components/global/AppHeader";
import { Button } from "../components/global/Button";
import { ArrowRightIcon } from "../assets/icons";
import { screenstyle, textbold, textlight } from "../assets/constants";

export default function SplashScreen(): JSX.Element {
  const navigation: NativeStackNavigationProp<RootStackParamList> =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const goToAccountSelection = (): void => {
    navigation.navigate("accountselection");
  };

  return (
    <SafeAreaView style={[screenstyle, styles.screen]}>
      <View>
        <AppHeader renderSearch={false} xstyles={{ paddingHorizontal: 0 }} />

        <Text style={[textbold, { fontSize: 18, marginTop: 16 }]}>
          Revolutionizing Equity Tokenization
        </Text>

        <Text style={[textlight, styles.justifytext, { marginTop: 16 }]}>
          Welcome to the future of investing and ownership. Quillo empowers
          companies to tokenize their shares and connect with a global network
          of investors seamlessly
        </Text>

        <Text style={[textlight, styles.justifytext, { marginTop: 8 }]}>
          We leverage the power of the Internet Computer (ICP) for a seamless
          and efficient tokenization process.
        </Text>

        <Text style={[textlight, styles.justifytext, { marginTop: 8 }]}>
          Our app ensures a smooth user experience, making it easy for companies
          and investors to navigate the tokenization landscape.
        </Text>

        <Text style={[textlight, styles.justifytext, { marginTop: 8 }]}>
          Your trust is our priority. Benefit from robust security measures to
          safeguard your digital assets and investments.
        </Text>

        <Text style={[textlight, styles.justifytext, { marginTop: 8 }]}>
          Join the movement towards a more inclusive and decentralized future.
          Whether you're a company looking to tokenize shares or an investor
          seeking new opportunities, Quillo is your gateway to a revolutionary
          era of finance.
        </Text>

        <Text style={[textbold, { marginTop: 32, textAlign: "center" }]}>
          Unlock Possibilities. Tokenize Ownership. Shape the Future.
        </Text>
      </View>

      <Button
        dpText="Get Started"
        dpIcon={<ArrowRightIcon />}
        isDisabled={false}
        onPressFunc={goToAccountSelection}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    justifyContent: "space-between",
  },
  justifytext: {
    textAlign: "justify",
  },
});
