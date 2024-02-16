import { JSX, useEffect, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation";
import { CreateCompanyHeader } from "../../components/company/CreateCompanyHeader";
import { CreateCompanyFooter } from "../../components/company/CreateCompanyFooter";
import { UploadIcon, CheckIcon } from "../../assets/icons";
import {
  colors,
  screenstyle,
  textbold,
  textlight,
  textlightfaint,
} from "../../assets/constants";

const footerInfo: { title: string; content: string }[] = [
  {
    title: "Let's start by capturing the basics",
    content:
      "This is the company information section, help investors get to know your business better by providing essential details. Your response will contribute to the seamless tokenization process and enhance transparency.",
  },
  {
    title: "Shares and Tokenization",
    content: "Unlock funding opportunities for your company",
  },
  {
    title: "Legal Information",
    content: "Securely upload your company's legal documents",
  },
];

const classes: { class: string; tokens: string; desc: string }[] = [
  {
    class: "Class A -- Small Company",
    tokens: "10,000,000",
    desc: `* Class A is suitable for small companies with a valuation up to 100,000,000 USD. This class offers a token allocation of 10,000,000 tokens, facilitating easy fundraising and investment accessibility`,
  },
  {
    class: "Class B -- Medium sized Company",
    tokens: "50,000,000",
    desc: `* Class B is tailored for medium-sized companies with a valuation between 500,000,000 USD With a token allocation of 50,000,000 tokens, this class opens doors to broader investment opportunities and capital influx`,
  },
  {
    class: "C -- Large Company",
    tokens: "100,000,000",
    desc: `* Class C is designed for large companies with a valuation exceeding 1,000,000,000 USD Offering a token allocation of 100,000,000 tokens, this class enables significant fundraising capabilities and access to diverse investor pools`,
  },
];

export default function CreateCompanyScreen(): JSX.Element {
  const [currId, setCurrId] = useState<number>(0);
  const [currHeaderId, setCurrHeaderId] = useState<number>(1);
  const [prevIsDisabled, setPrevIsDisabled] = useState<boolean>(true);
  const [showClass, setShowClass] = useState<boolean>(false);
  const [classId, setClassId] = useState<number>(0);
  const [keyboardIsVisible, setKeyboardIsVisible] = useState<boolean>(false);

  /** input states*/
  const [companyName, setCompanyName] = useState<string>("");
  const [companyDesc, setCompanyDesc] = useState<string>("");
  const [industry, setIndustry] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [dateFounded, setDateFounded] = useState<string>("");
  const [companyValuation, setCompanyValuation] = useState<string>("");
  const [tokenizeAmnt, setTokenizeAmnt] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [registrationCert, setRegistrationCert] = useState<Blob>();
  const [taxInfo, setTaxInfo] = useState<Blob>();
  const [incInfo, setIncInfo] = useState<Blob>();

  const navigation: NativeStackNavigationProp<RootStackParamList> =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const goToHomeScreen = (): void => {
    navigation.navigate("companyhome");
  };

  const pressPrevBtn = (): void => {
    if (currId !== 0) {
      setCurrId(currId - 1);
      setCurrHeaderId((id) => id - 1);
    }
  };

  const pressNextBtn = (): void => {
    if (currId == 1 && !showClass) {
      Number(companyValuation) <= 100000000
        ? setClassId(0)
        : Number(companyValuation) <= 500000000
        ? setClassId(1)
        : setClassId(2);

      setShowClass(true);
    } else {
      if (currId !== footerInfo.length - 1) {
        setCurrId(currId + 1);
        setCurrHeaderId((id) => id + 1);
      } else {
        goToHomeScreen();
      }
    }
  };

  useEffect(() => {
    if (currId == 0) setPrevIsDisabled(true);
    else {
      setPrevIsDisabled(false);
    }
  }, [currId]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardIsVisible(true);
    });

    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardIsVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <SafeAreaView style={[screenstyle, { paddingHorizontal: 0 }]}>
      <CreateCompanyHeader currSection={currHeaderId} />

      {currId == 0 && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[
            styles.basicinfoctr,
            { marginBottom: keyboardIsVisible ? 0 : 155 },
          ]}
        >
          <TextInput
            placeholder="Company name"
            placeholderTextColor={colors.text_secondary}
            style={styles.input}
            value={companyName}
            onChangeText={(text) => setCompanyName(text)}
          />

          <Text style={[textlight, { marginTop: 16 }]}>
            Company description
          </Text>
          <TextInput
            multiline
            maxLength={256}
            placeholder="We are a..."
            placeholderTextColor={colors.text_secondary}
            style={[
              styles.input,
              styles.solidborderinput,
              {
                height: 140,
                textAlignVertical: "top",
              },
            ]}
            value={companyDesc}
            onChangeText={(text) => setCompanyDesc(text)}
          />

          <TextInput
            placeholder="Industry"
            placeholderTextColor={colors.text_secondary}
            style={[styles.input, styles.solidborderinput, { marginTop: 16 }]}
            value={industry}
            onChangeText={(text) => setIndustry(text)}
          />

          <Text style={[textlight, { marginTop: 16 }]}>Location</Text>
          <TextInput
            placeholder="Country"
            placeholderTextColor={colors.text_secondary}
            style={[styles.input, styles.solidborderinput]}
            value={country}
            onChangeText={(text) => setCountry(text)}
          />

          <TextInput
            placeholder="Address"
            placeholderTextColor={colors.text_secondary}
            style={[styles.input, styles.solidborderinput]}
            value={address}
            onChangeText={(text) => setAddress(text)}
          />

          <Text style={[textlight, { marginTop: 16 }]}>Date founded</Text>
          <TextInput
            placeholder="01-01-2015"
            placeholderTextColor={colors.text_secondary}
            style={[styles.input, styles.solidborderinput]}
            value={dateFounded}
            onChangeText={(text) => setDateFounded(text)}
          />
        </ScrollView>
      )}

      {currId == 1 && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[
            styles.basicinfoctr,
            { marginBottom: keyboardIsVisible ? 0 : 155 },
          ]}
        >
          <Text style={[textlight, { marginTop: 8 }]}>
            Your estimated company valuation (USD)
          </Text>
          <TextInput
            placeholder="2,000,000"
            keyboardType="number-pad"
            placeholderTextColor={colors.text_secondary}
            style={styles.input}
            value={companyValuation}
            onChangeText={(text) => setCompanyValuation(text)}
          />

          <Text style={[textlight, { marginTop: 16 }]}>
            % Shares to tokenize
          </Text>
          <TextInput
            placeholder="40%"
            keyboardType="number-pad"
            placeholderTextColor={colors.text_secondary}
            style={styles.input}
            value={tokenizeAmnt}
            onChangeText={(text) => setTokenizeAmnt(text)}
          />

          <Text style={[textlight, { marginTop: 16 }]}>
            Add your wallet address
          </Text>
          <TextInput
            placeholder="WqTG08..."
            placeholderTextColor={colors.text_secondary}
            style={styles.input}
            value={walletAddress}
            onChangeText={(text) => setWalletAddress(text)}
          />

          {showClass && (
            <>
              <Text style={[textbold, { marginTop: 24, fontSize: 14 }]}>
                Your company classification
              </Text>

              <Text style={[textlightfaint, { marginTop: 8 }]}>
                * Class {classes[classId].class}
              </Text>
              <Text style={[textlightfaint, { marginTop: 8 }]}>
                * Token Allocation -- {classes[classId].tokens} Tokens
              </Text>
              <Text
                style={[textlightfaint, { marginTop: 8, textAlign: "justify" }]}
              >
                {classes[classId].desc}
              </Text>
            </>
          )}
        </ScrollView>
      )}

      {currId == 2 && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[
            styles.basicinfoctr,
            { marginBottom: keyboardIsVisible ? 0 : 155 },
          ]}
        >
          <Text style={[textlight, { marginTop: 8 }]}>
            Upload your legal documents
          </Text>

          <TouchableOpacity style={styles.touchable}>
            <Text style={styles.touchbletitle}>Registration certificate</Text>
            <UploadIcon />
          </TouchableOpacity>

          <TouchableOpacity style={styles.touchable}>
            <Text style={styles.touchbletitle}>Tax information</Text>
            <UploadIcon />
          </TouchableOpacity>

          <TouchableOpacity style={styles.touchable}>
            <Text style={styles.touchbletitle}>Document of incorporation</Text>
            <CheckIcon />
          </TouchableOpacity>
        </ScrollView>
      )}

      {!keyboardIsVisible && (
        <CreateCompanyFooter
          disablePrev={prevIsDisabled}
          footerTitle={footerInfo[currId]?.title}
          footerContent={footerInfo[currId].content}
          onPressPrev={pressPrevBtn}
          onPressNext={pressNextBtn}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  basicinfoctr: {
    paddingHorizontal: 12,
  },
  input: {
    ...textlight,
    padding: 8,
    paddingVertical: 10,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: colors.divider,
    color: colors.text_primary,
  },
  solidborderinput: { marginTop: 8, borderWidth: 1, borderRadius: 4 },
  touchable: {
    marginTop: 12,
    padding: 8,
    // paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 6,
    borderColor: colors.divider,
    backgroundColor: colors.divider,
  },
  touchbletitle: {
    ...textlightfaint,
    fontSize: 12,
  },
});
