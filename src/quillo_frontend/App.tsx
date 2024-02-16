import { JSX, useCallback } from "react";
import * as ExpoSplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { Navigation } from "./navigation";

export default function App(): JSX.Element {
  const [fontsLoaded] = useFonts({
    "ops-light": require("./assets/fonts/OpenSans-Light.ttf"),
    "ops-regular": require("./assets/fonts/OpenSans-Regular.ttf"),
  });

  const onLayoutRootView: () => Promise<void> = useCallback(async () => {
    if (fontsLoaded) {
      await ExpoSplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>

      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
