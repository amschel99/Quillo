import { JSX } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen(): JSX.Element {
  return (
    <SafeAreaView>
      <View>
        <Text>Home Screen</Text>
      </View>
    </SafeAreaView>
  );
}
