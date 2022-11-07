import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { nodeEnv } from "serverconf";

import nsSearchKO from "./ko/search.json";
import nsAddroomKO from "./ko/addroom.json";
import nsMyroomKO from "./ko/myroom.json";
import nsMypageKO from "./ko/mypage.json";

import nsSearchEN from "./en/search.json";
import nsAddroomEN from "./en/addroom.json";
import nsMyroomEN from "./en/myroom.json";
import nsMypageEN from "./en/mypage.json";

/** {@link https://www.i18next.com/overview/configuration-options} */
i18n.use(initReactI18next).init({
  resources: {
    ko: {
      search: nsSearchKO,
      addroom: nsAddroomKO,
      myroom: nsMyroomKO,
      mypage: nsMypageKO,
    },
    en: {
      search: nsSearchEN,
      addroom: nsAddroomEN,
      myroom: nsMyroomEN,
      mypage: nsMypageEN,
    },
  },
  debug: nodeEnv === "development",
  lng: "ko", // inintial language
  fallbackLng: "ko",
  defaultNS: "mypage", // default namespace
});

export default i18n;
