import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  screenstyle,
  textbold,
  textlightfaint,
  textlight,
  textlightfaintbold,
} from "../../assets/constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "navigation";
import { AppHeader } from "../../components/global/AppHeader";
import { Button } from "../../components/global/Button";
import { ArrowRightIcon } from "../../assets/icons";

type CompanyDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "companyDetailsScreen"
>;

export default function CompanyDetailsScreen({
  route,
  navigation,
}: CompanyDetailsScreenProps): JSX.Element {
  const { companyId } = route.params;
  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScrollView>
        <AppHeader renderSearch={true} />
        <View style={styles.bodyContainer}>
          <Text style={{ ...textbold, fontSize: 18, marginBottom: 16 }}>
            About Quillo
          </Text>
          <Text style={{ ...textlightfaint, fontSize: 16, marginBottom: 8 }}>
            Registered Name
          </Text>
          <Text style={{ ...textlight, fontSize: 16, marginBottom: 16 }}>
            Quillo
          </Text>
          <Text style={{ ...textlightfaint, fontSize: 16, marginBottom: 8 }}>
            About
          </Text>
          <Text style={{ ...textlight, fontSize: 16, marginBottom: 16 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
            nesciunt sunt voluptas atque autem, commodi temporibus possimus
            fugiat ab officiis! Quidem et ut expedita nesciunt necessitatibus
            magni, totam ipsa quo! Officiis commodi quae accusantium nam eos non
            hic libero harum. Quae totam cum dolorum odio dignissimos tempora
            quibusdam temporibus iure dolore voluptatum voluptatibus ratione,
            veritatis dicta iusto tenetur vero exercitationem!
          </Text>
          <Text style={{ ...textlightfaint, fontSize: 16, marginBottom: 8 }}>
            Location
          </Text>
          <Text style={{ ...textlight, fontSize: 16, marginBottom: 16 }}>
            000123, Nairobi, Kenya
          </Text>
          <Text style={{ ...textlightfaint, fontSize: 16, marginBottom: 8 }}>
            Industry
          </Text>
          <Text style={{ ...textlight, fontSize: 16, marginBottom: 16 }}>
            Technology
          </Text>
          <Text
            style={{ ...textlightfaintbold, fontSize: 16, marginBottom: 8 }}
          >
            Share distribution
          </Text>

          <View style={{ display: "flex", flexDirection: "row", gap: 29 }}>
            <View style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Text
                style={{ ...textlightfaint, fontSize: 16, marginBottom: 8 }}
              >
                Available shares
              </Text>
              <Text style={{ ...textlight, fontSize: 14, marginBottom: 16 }}>
                6000000
              </Text>
            </View>
            <View style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Text
                style={{ ...textlightfaint, fontSize: 16, marginBottom: 8 }}
              >
                Share price
              </Text>
              <Text style={{ ...textlight, fontSize: 14, marginBottom: 16 }}>
                2 Tokens/Share
              </Text>
            </View>
          </View>
          <Text style={{ ...textlightfaint, fontSize: 16, marginBottom: 16 }}>
            Documents
          </Text>
          <View>
            <Text style={{ ...textlight, fontSize: 16, marginBottom: 16 }}>
              See Quillo documents
            </Text>
          </View>
          <Text style={{ ...textlightfaint, fontSize: 16, marginBottom: 8 }}>
            Founded
          </Text>
          <Text style={{ ...textlight, fontSize: 16, marginBottom: 16 }}>
            12th Feb 2014, about 10 years ago
          </Text>
        </View>
        <Button
          dpText={"Get Quillo Shares"}
          dpIcon={<ArrowRightIcon />}
          isDisabled={false}
          onPressFunc={() => {}}
          xstyles={{ borderRadius: 0 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    ...screenstyle,
    paddingHorizontal: 0,
    paddingVertical: 0,
    gap: 18,
  },
  bodyContainer: {
    padding: 8,
  },
});
