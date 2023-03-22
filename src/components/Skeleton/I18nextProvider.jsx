import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { nodeEnv } from "serverconf";

import nsSearchKO from "pages/Search/langs/ko.json";
import nsAddroomKO from "pages/Addroom/langs/ko.json";
import nsMyroomKO from "pages/Myroom/langs/ko.json";
import nsMypageKO from "pages/Mypage/langs/ko.json";

import nsSearchEN from "pages/Search/langs/en.json";
import nsAddroomEN from "pages/Addroom/langs/en.json";
import nsMyroomEN from "pages/Myroom/langs/en.json";
import nsMypageEN from "pages/Mypage/langs/en.json";

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
