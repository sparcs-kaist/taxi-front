import { RootStack } from "@/screens";
import remoteConfig from "@react-native-firebase/remote-config";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { View } from "react-native";

export function App() {
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
