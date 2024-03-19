import { HomeTabScreenProps } from "@/navigation/types";
import React from "react";

import { TaxiWebView } from "@/components/TaxiWebView";

export const Home: React.FC<HomeTabScreenProps<"Home">> = () => (
  <TaxiWebView path="/home" />
);
