import { useEffect, useRef } from "react";
import { WebViewMessageEvent } from "react-native-webview";

export interface RNEventProps {
  event: string;
  data?: any;
}

export interface RNEventListenrProps {
  event: string;
  listener: (data: any) => any;
}

export const useWebViewEvent = () => {
  const eventRef = useRef<Map<string, RNEventListenrProps>>(new Map());

  useEffect(() => {
    eventRef.current = new Map();
  }, []);

  const addEvent = (event: RNEventListenrProps) => {
    eventRef.current?.set(event.event, event);
  };
  const removeEvent = (event: RNEventListenrProps) => {
    eventRef.current?.delete(event.event);
  };
  const handleMessage = (event: WebViewMessageEvent) => {
    const data = JSON.parse(event.nativeEvent.data);
    const eventProps = eventRef.current?.get(data.event);
    eventProps?.listener(data.data);
  };
  return {
    addEvent,
    removeEvent,
    handleMessage,
  };
};
