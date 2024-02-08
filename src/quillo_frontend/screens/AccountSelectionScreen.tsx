import { JSX, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation";
import { AppHeader } from "../components/global/AppHeader";
import { Button } from "../components/global/Button";
import { ArrowRightIcon } from "../assets/icons";
import {
  colors,
  screenstyle,
  textlight,
  textlightfaint,
} from "../assets/constants";

export default function AccountSelectionScreen(): JSX.Element {
  const [accType, setAccType] = useState<string>("");

  const navigation: NativeStackNavigationProp<RootStackParamList> =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const goToCompanyProfile = (): void => {
    navigation.navigate("createcompany");
  };

  const goToInvestorHome = (): void => {
    navigation.navigate("home");
  };

  return (
    <SafeAreaView style={[screenstyle, styles.screen]}>
      <View>
        <AppHeader renderSearch={false} />

        <TouchableOpacity
          onPress={() => setAccType("inv")}
          style={[
            styles.acctype,
            {
              backgroundColor:
                accType == "inv" ? colors.divider : colors.divider_faint,
            },
          ]}
        >
          <View style={{ width: "84%", gap: 6 }}>
            <Text style={[textlight, { fontFamily: "ops-regular" }]}>
              Start as an Investor
            </Text>

            <Text style={textlightfaint}>
              Extend your portfolio by accessing a wide range of investment
              opportunities
            </Text>
          </View>

          <View
            style={[
              styles.indicator,
              {
                backgroundColor:
                  accType == "inv" ? colors.divider : colors.divider_faint,
              },
            ]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setAccType("bns")}
          style={[
            styles.acctype,
            {
              marginTop: 24,
              backgroundColor:
                accType == "bns" ? colors.divider : colors.divider_faint,
            },
          ]}
        >
          <View style={{ width: "84%", gap: 6 }}>
            <Text style={[textlight, { fontFamily: "ops-regular" }]}>
              Start as a Company
            </Text>

            <Text style={textlightfaint}>
              Unlock unprecedented access to global investors and democratize
              ownership
            </Text>
          </View>

          <View
            style={[
              styles.indicator,
              {
                backgroundColor:
                  accType == "bns" ? colors.divider : colors.divider_faint,
              },
            ]}
          ></View>
        </TouchableOpacity>
      </View>

      <Button
        dpText="Sign In"
        dpIcon={
          <ArrowRightIcon
            iconColor={
              accType == "" ? colors.text_secondary : colors.text_primary
            }
          />
        }
        isDisabled={accType == "" ? true : false}
        onPressFunc={accType == "bns" ? goToCompanyProfile : goToInvestorHome}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    justifyContent: "space-between",
  },
  acctype: {
    width: "100%",
    paddingHorizontal: 8,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 32,
    borderWidth: 0.5,
    borderRadius: 6,
    borderColor: colors.divider,
  },
  indicator: {
    width: 14,
    height: 14,
    borderWidth: 1,
    borderRadius: 500,
    borderColor: colors.divider,
  },
});
