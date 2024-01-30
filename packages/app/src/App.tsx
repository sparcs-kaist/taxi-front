import { RootStack } from "@/screens";
import { NavigationContainer } from "@react-navigation/native";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { Platform, SafeAreaView, View } from "react-native";

export function App() {
  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
        }}
      >
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
}
