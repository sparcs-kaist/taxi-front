import { RootStack } from "@/screens";
import remoteConfig from "@react-native-firebase/remote-config";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { View } from "react-native";

export function App() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
    SpoqaHanSansNeoThin: require("../assets/fonts/SpoqaHanSansNeo-Thin.otf"),
    SpoqaHanSansNeoLight: require("../assets/fonts/SpoqaHanSansNeo-Light.otf"),
    SpoqaHanSansNeoRegular: require("../assets/fonts/SpoqaHanSansNeo-Regular.otf"),
    SpoqaHanSansNeoMedium: require("../assets/fonts/SpoqaHanSansNeo-Medium.otf"),
    SpoqaHanSansNeoBold: require("../assets/fonts/SpoqaHanSansNeo-Bold.otf"),
  });

  if (!loaded) {
    return null;
  }

  useEffect(() => {
    console.log(remoteConfig().getAll());
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  );
}
