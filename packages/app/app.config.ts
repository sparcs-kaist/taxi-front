import type { ConfigContext, ExpoConfig } from "@expo/config";
import ip from "internal-ip";

const isDev = process.env.NODE_ENV === "development";

export default ({ config }: ConfigContext): Partial<ExpoConfig> => ({
  ...config,
  name: "Taxi for KAIST",
  slug: "Taxi-for-KAIST",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "org.sparcs.taxi-app",
    googleServicesFile: "./config/GoogleService-Info.plist",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "org.sparcs.taxi_app",
    googleServicesFile: "./config/google-services.json",
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  experiments: {
    tsconfigPaths: true,
  },
  extra: {
    SERVER_URL: isDev
      ? `http://${ip.v4.sync()}:3000`
      : "https://taxi.sparcs.org",
  },
});
