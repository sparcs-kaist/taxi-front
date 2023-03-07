import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { nodeEnv } from "serverconf";

import nsSearchKO from "./search/ko.json";
import nsAddroomKO from "./addroom/ko.json";
import nsMyroomKO from "./myroom/ko.json";
import nsMypageKO from "./mypage/ko.json";

import nsSearchEN from "./search/en.json";
import nsAddroomEN from "./addroom/en.json";
import nsMyroomEN from "./myroom/en.json";
import nsMypageEN from "./mypage/en.json";

/**
 * {@link https://www.i18next.com/overview/configuration-options}
 * {@link https://github.com/i18next/i18next-browser-languageDetector}
 * */
i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
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
    keySeparator: ".",
    fallbackLng: "ko",
    defaultNS: "mypage", // default namespace
  });

const I18nextProvider = () => null;

export default I18nextProvider;
