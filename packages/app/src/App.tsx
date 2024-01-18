import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "text-encoding-polyfill";

import { Wrapped } from "./web/Test";

export function App() {
  return (
    <View style={styles.container}>
      <Wrapped />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "purple",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
