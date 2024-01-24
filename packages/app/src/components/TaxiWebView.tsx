import { env } from "@/env";
import { mapWebRoutes } from "@/navigation/web";
import { isSameScreen } from "@/utils/navigation";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useCallback, useMemo, useRef } from "react";
import { WebView, type WebViewNavigation } from "react-native-webview";

type TaxiWebViewProps = {
  path: string;
};

export const TaxiWebView: React.FC<TaxiWebViewProps> = ({ path }) => {
  const uri = useMemo(
    () => (path.startsWith("/") ? env.SERVER_URL + path : path),
    [path]
  );
  const ref = useRef<WebView>(null);
  const currentScreen = useMemo(() => mapWebRoutes(uri), [uri]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const onNavigationStateChange = useCallback(
    (event: WebViewNavigation) => {
      const screen = mapWebRoutes(event.url);
      if (!isFocused || isSameScreen(currentScreen, screen)) return;

      navigation.navigate(...screen);
      ref.current?.stopLoading();
      ref.current?.goBack();
    },
    [isFocused, currentScreen, navigation]
  );

  return (
    <WebView
      cacheEnabled
      ref={ref}
      userAgent="taxi-app-webview"
      source={{ uri }}
      onNavigationStateChange={onNavigationStateChange}
      onShouldStartLoadWithRequest={(request) => {
        console.log(request.mainDocumentURL);
        return true;
      }}
    />
  );
};
