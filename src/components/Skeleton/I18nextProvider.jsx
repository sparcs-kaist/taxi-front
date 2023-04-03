import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { useEffect } from "react";
import { initReactI18next, useTranslation } from "react-i18next";

import nsAddroomEN from "pages/Addroom/langs/en.json";
import nsAddroomKO from "pages/Addroom/langs/ko.json";
import nsHomeEN from "pages/Home/langs/en.json";
import nsHomeKO from "pages/Home/langs/ko.json";
import nsMypageEN from "pages/Mypage/langs/en.json";
import nsMypageKO from "pages/Mypage/langs/ko.json";
import nsMyroomEN from "pages/Myroom/langs/en.json";
import nsMyroomKO from "pages/Myroom/langs/ko.json";
import nsSearchEN from "pages/Search/langs/en.json";
import nsSearchKO from "pages/Search/langs/ko.json";

import { nodeEnv } from "loadenv";

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
        home: nsHomeKO,
        search: nsSearchKO,
        addroom: nsAddroomKO,
        myroom: nsMyroomKO,
        mypage: nsMypageKO,
      },
      en: {
        home: nsHomeEN,
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

const I18nextProvider = () => {
  const { i18n: i18nt } = useTranslation();

  useEffect(() => {
    if (!["ko", "en"].includes(i18nt.language)) {
      i18nt.changeLanguage("ko");
    }
  }, []);

  return null;
};

export default I18nextProvider;
