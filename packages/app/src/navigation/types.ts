/**
 * Native tab navigation is disabled temporarily. (handled inside webview)
 * Uncomment the commented code to enable native tab navigation.
 */
// import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
// import type {
//   CompositeScreenProps,
//   NavigatorScreenParams,
// } from "@react-navigation/native";
import type { StackScreenProps } from "@react-navigation/stack";

// export type HomeTabParamList = {
//   Home: undefined;
//   Search: undefined;
//   AddRoom: undefined;
//   MyRoom: undefined;
//   MyPage: undefined;
// };

export type RootStackParamList = {
  // HomeTab: NavigatorScreenParams<HomeTabParamList>;
  Home: undefined;
  Event: { eventName: string };
  Chatting: { roomId: string };
  Web: { uri: string };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

// export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
//   CompositeScreenProps<
//     BottomTabScreenProps<HomeTabParamList, T>,
//     RootStackScreenProps<keyof RootStackParamList>
//   >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
