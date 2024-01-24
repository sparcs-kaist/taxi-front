import { RootStackScreenProps } from "@/navigation/types";
import React from "react";

import { TaxiWebView } from "@/components/TaxiWebView";

export const Chatting: React.FC<RootStackScreenProps<"Chatting">> = ({
  route: { params },
}) => <TaxiWebView path={`/chatting/${params.roomId}`} />;
