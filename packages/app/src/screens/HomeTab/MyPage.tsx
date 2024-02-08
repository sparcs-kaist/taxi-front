import { HomeTabScreenProps } from "@/navigation/types";
import React from "react";

import { TaxiWebView } from "@/components/TaxiWebView";

export const MyPage: React.FC<HomeTabScreenProps<"MyPage">> = () => (
  <TaxiWebView path="/mypage" />
);
