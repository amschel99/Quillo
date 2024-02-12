import { JSX, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation";
import { AppHeader } from "../../components/global/AppHeader";
import { Button } from "../../components/global/Button";
import { KeyBoardComponent } from "../../components/global/KeyBoardComponent";
import { SCREENWIDTH, colors } from "../../assets/constants";
import {
  screenstyle,
  textbold,
  textlight,
  textlightfaint,
  textlightfaintbold,
} from "../../assets/constants";
import { ArrowRightIcon } from "../../assets/icons";

type buysharesProps = NativeStackScreenProps<RootStackParamList, "buyshares">;

export default function BuySharesScreen({
  route,
  navigation,
}: buysharesProps): JSX.Element {
  const [numberOfQuilloShares, setNumberOfQuilloShares] = useState("");
  const [decimalClicked, setDecimalClicked] = useState(false);
  const [decimalPlaceIndex, setDecimalPlaceIndex] = useState<number>(-1);
  const { companyId } = route.params;

  const goBack = (): void => navigation.goBack();

  const handlePress = () => {};

  const handleIncludeValue = (digit: string) => {
    setNumberOfQuilloShares((prev) => prev + digit);
  };

  const handlePopeValue = () => {
    if (numberOfQuilloShares.length <= decimalPlaceIndex + 1) {
      // Resetting the decimal place clicked state because it has been erased
      // Recording the index of the decimal place in the string
      setDecimalClicked(false);
      setDecimalPlaceIndex(-1);
    }
    setNumberOfQuilloShares((prev) =>
      prev.substring(0, numberOfQuilloShares.length - 1)
    );
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <AppHeader renderSearch={true} />
      <ScrollView>
        <Text style={{ ...textbold, marginBottom: 16, paddingHorizontal: 8 }}>
          Get Quillo Shares
        </Text>
        <Text
          style={{
            ...textlightfaintbold,
            fontSize: 16,
            marginBottom: 16,
            paddingHorizontal: 8,
          }}
        >
          Share distribution
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 32,
            marginBottom: 16,
            paddingHorizontal: 8,
          }}
        >
          <View>
            <Text style={{ ...textlightfaint, fontSize: 16 }}>
              Available shares
            </Text>
            <Text style={textlight}>6000000</Text>
          </View>
          <View>
            <Text style={{ ...textlightfaint, fontSize: 16 }}>
              Share distribution
            </Text>
            <Text style={textlight}>2 Tokens/Share</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <Text
          style={{
            ...textlightfaintbold,
            fontSize: 16,
            marginBottom: 16,
            paddingHorizontal: 8,
          }}
        >
          How many Quillo shares would you like to acquire ?
        </Text>
        <TouchableOpacity style={styles.inputBox}>
          <Text style={{ ...textlightfaint, fontSize: 16 }}>
            {numberOfQuilloShares}
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            ...textlight,
            fontSize: 16,
            paddingHorizontal: 8,
            marginBottom: 48,
          }}
        >
          200 shares = 400 tokens
        </Text>
        <KeyBoardComponent
          handleIncludeValue={handleIncludeValue}
          handlePopeValue={handlePopeValue}
          decimalClicked={decimalClicked}
          setDecimalClicked={setDecimalClicked}
          numberOfQuilloShares={numberOfQuilloShares}
          setDecimalPlaceIndex={setDecimalPlaceIndex}
        />
      </ScrollView>
      <Button
        dpText={"Get Quillo Shares"}
        dpIcon={<ArrowRightIcon />}
        isDisabled={false}
        onPressFunc={handlePress}
        xstyles={{ borderRadius: 0, marginBottom: 8 }}
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
  divider: {
    width: SCREENWIDTH,
    borderBottomWidth: 1,
    marginBottom: 16,
    borderColor: colors.divider_faint,
  },
  inputBox: {
    height: 44,
    borderColor: colors.divider_faint,
    backgroundColor: colors.divider,
    paddingHorizontal: 8,
    paddingVertical: 11,
    marginHorizontal: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderRadius: 6,
  },
});
