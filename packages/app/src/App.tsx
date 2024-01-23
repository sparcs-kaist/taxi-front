import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

// import { Wrapped } from "./web/Test";

export function App() {
  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: Constants.expoConfig?.extra?.SERVER_URL,
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "purple",
  },
});
