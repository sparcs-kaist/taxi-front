import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { nodeEnv } from "serverconf";

import TranslationEn from "lang/translation.en.json";
import TranslationKo from "lang/translation.ko.json";

const resource = {
  en: {
    translations: TranslationEn,
  },
  ko: {
    translations: TranslationKo,
  },
};

/** {@link https://www.i18next.com/overview/configuration-options} */
i18n
  .use(initReactI18next)
  .init({
    resources: resource,
    debug: nodeEnv === 'development',

    lng: "ko", // 초기 언어 설정
    fallbackLng: "ko",
    nsSeparator: ".",
    keySeparator: false,
    // defaultNS: "translation",
    // ns: "translation",
  });

export default i18n;
