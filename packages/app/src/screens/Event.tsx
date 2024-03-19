import { RootStackScreenProps } from "@/navigation/types";
import React from "react";

import { TaxiWebView } from "@/components/TaxiWebView";

export const Event: React.FC<RootStackScreenProps<"Event">> = ({
  route: { params },
}) => <TaxiWebView path={`/event/${params.eventName}`} />;
