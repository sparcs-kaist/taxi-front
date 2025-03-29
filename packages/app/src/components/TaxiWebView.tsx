import * as Clipboard from "expo-clipboard";
import { env } from "@/env";
import { mapWebRoutes } from "@/navigation/web";
import { isSameScreen } from "@/utils/navigation";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useCallback, useMemo, useRef } from "react";
import { Platform, ToastAndroid } from "react-native";
import {
  WebView,
  WebViewMessageEvent,
  type WebViewNavigation,
} from "react-native-webview";

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
  const [isLogin, setIsLogin] = useState(false);

  const handleMessage = (event: WebViewMessageEvent) => {
    const data = JSON.parse(event.nativeEvent.data);
    switch (data.type) {
      case "auth_update":
        handleAuthUpdate(data.payload);
        break;
      case "auth_logout":
        handleAuthLogout();
        break;
      case "try_notification":
        handleTryNotification();
        break;
      case "clipboard_copy":
        handleClipboardCopy(data.payload);
        break;
      case "popup_inAppNotification":
        handlePopupInAppNotification(data.payload);
        break;
      case "popup_instagram_story_share":
        handlePopupInstagramStoryShare(data.payload);
        break;
    }
  };

  const handleAuthUpdate = (payload) => {
    if (payload === {}) {
      setIsLogin(false);
    } else if (payload.accessToken && payload.refreshToken) {
      // 토큰 저장 로직
      setIsLogin(true);
    }
  };

  const handleAuthLogout = async () => {
    try {
      // 로그아웃 로직 (토큰 삭제 등)
      setIsLogin(false);
      if (!ref.current) return;
      ref.current.reload();
    } catch (error) {
      ToastAndroid.show(
        "서버와의 연결에 문제가 발생했습니다.",
        ToastAndroid.SHORT
      );
    }
  };

  const handleTryNotification = async () => {
    // 알림 권한 확인 및 요청 로직
  };

  const handleClipboardCopy = async (text: string) => {
    await Clipboard.setStringAsync(text);
  };

  const handlePopupInAppNotification = (payload) => {
    // 인앱 알림 표시 로직
  };

  const handlePopupInstagramStoryShare = async (payload) => {
    // 인스타그램 스토리 공유 로직
  };

  const injectedJavaScript = `
    window.ReactNativeWebView.postMessage = (data) => {
      window.postMessage(JSON.stringify(data));
    };
  `;

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
      userAgent={`taxi-app-webview/${Platform.OS}`}
      source={{ uri }}
      onMessage={handleMessage}
      onNavigationStateChange={onNavigationStateChange}
    />
  );
};
