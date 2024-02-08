import { HomeTabScreenProps } from "@/navigation/types";
import React from "react";

import { TaxiWebView } from "@/components/TaxiWebView";

export const MyRoom: React.FC<HomeTabScreenProps<"MyRoom">> = () => (
  <TaxiWebView path="/myroom" />
);
