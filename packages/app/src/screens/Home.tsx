import { RootStackScreenProps } from "@/navigation/types";
import React from "react";

import { TaxiWebView } from "@/components/TaxiWebView";

export const Home: React.FC<RootStackScreenProps<"Home">> = () => (
  <TaxiWebView path="/home" />
);
