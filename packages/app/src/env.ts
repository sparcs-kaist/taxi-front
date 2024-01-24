import Constants from "expo-constants";

export const env = {
  SERVER_URL: "https://taxi.sparcs.org",
  ...Constants.expoConfig?.extra,
};
