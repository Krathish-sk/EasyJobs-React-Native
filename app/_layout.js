import { Stack } from "expo-router";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dev";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded] = useFonts({
    // DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    // DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    // DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
    DMRegular: DMSans_400Regular,
    DMMedium: DMSans_500Medium,
    DMBold: DMSans_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;
  return <Stack onLayout={onLayoutRootView} />;
}
