import { RootStackScreenProps } from "@/navigation/types";
import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

import { TaxiWebView } from "@/components/TaxiWebView";

export const Chatting: React.FC<RootStackScreenProps<"Chatting">> = ({
  route: { params },
}) => (
  <KeyboardAvoidingView
    behavior={Platform.select({ ios: "padding", android: "height" })}
    style={{ flex: 1 }}
    // @TODO: Remove keyboard avoiding in web
  >
    <TaxiWebView path={`/chatting/${params.roomId}`} />
  </KeyboardAvoidingView>
);
