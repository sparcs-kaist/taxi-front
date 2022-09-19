import React from "react";
import i18n from "../../lang/i18n";

const Translation = () => {
  const clickHandler = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div>
      <button onClick={() => clickHandler("ko")}>한국어</button>
      <button onClick={() => clickHandler("en")}>English</button>
    </div>
  );
};

export default Translation;
