import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import ScrollRestoration from "react-scroll-restoration";
import ChannelTalk from "components/Skeleton/ChannelTalk";
import AlertProvider from "components/Skeleton/AlertProvider";
import Skeleton from "components/Skeleton/Skeleton";

import Login from "components/Login/Login";
import Search from "components/Search/Search";
import AddRoom from "components/AddRoom/AddRoom";
import Myroom from "components/Myroom/Myroom";
import Mypage from "components/Mypage/Mypage";
import WrapChat from "components/Chatting/WrapChat";
import Error from "components/Error/Error";
import i18n from "i18next"
import {useTranslation, initReactI18next} from "react-i18next";
import TranslationEn from "./translation.en.json";
import TranslationKo from "./translation.ko.json";

import "App.css";
import "Font.css";

const resource = {
  en: {
    translations: TranslationEn,
  },
  ko: {
    translations: TranslationKo,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: resource,
    lng: "ko", // if you're using a language detector, do not define the lng option
    fallbackLng: "ko",
    debug: true,
    defaultNS: "translations",
    ns: "translations",
    keySeparator: false,
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

const App = () => {
  return (
    <RecoilRoot>
      <Router>
        <ScrollRestoration />
        <ChannelTalk />
        <AlertProvider />
        <Skeleton>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Search} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/addroom" component={AddRoom} />
            <Route exact path="/myroom" component={Myroom} />
            <Route exact path="/myroom/:roomId" component={Myroom} />
            <Route exact path="/mypage" component={Mypage} />
            <Route exact path="/chatting/:roomId" component={WrapChat} />
            <Route exact path="/error/:error" component={Error} />
            <Route path="*" component={Error} />
          </Switch>
        </Skeleton>
      </Router>
    </RecoilRoot>
  );
};

export default App;
