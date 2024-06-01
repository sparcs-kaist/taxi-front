import { RootStack } from "@/screens";
import { NavigationContainer } from "@react-navigation/native";
import { hello } from "@taxi/core";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

export function App() {
  hello(); // test
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  );
}
