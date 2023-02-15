import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { nodeEnv } from "serverconf";

import nsSearchKO from "./search/ko.json";
import nsAddroomKO from "./addroom/ko.json";
import nsMyroomKO from "./myroom/ko.json";
import nsMypageKO from "./mypage/ko.json";

import nsSearchEN from "./search/en.json";
import nsAddroomEN from "./addroom/en.json";
import nsMyroomEN from "./myroom/en.json";
import nsMypageEN from "./mypage/en.json";

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
  keySeparator: ".",
  fallbackLng: "ko",
  defaultNS: "mypage", // default namespace
});

export default i18n;
