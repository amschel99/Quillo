import { JSX } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation";
import { SCREENWIDTH, textbold } from "../../assets/constants";

interface headerProps {
  companyName: string;
}

export default function CompanyHeader({
  companyName,
}: headerProps): JSX.Element {
  const navigation: NativeStackNavigationProp<RootStackParamList> =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const goToProfile = () => navigation.navigate("mycompanyprofile");

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goToProfile}>
        <Text style={[textbold, { fontSize: 32, fontWeight: "bold" }]}>
          {companyName[0]}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREENWIDTH,
    padding: 8,
  },
});
