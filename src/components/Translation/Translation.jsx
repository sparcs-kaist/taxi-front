import React from "react";
import i18n from "../../lang/i18n";

const Translation = () => {
  const clickHandler = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <BtnC
        onClick={() => {
          clickHandler("en");
        }}
      >
        English
      </BtnC>
      <div>화살표</div>
      <BtnC
        onClick={() => {
          clickHandler("ko");
        }}
      >
        한국어
      </BtnC>
    </div>
  );
};

export default Translation;
