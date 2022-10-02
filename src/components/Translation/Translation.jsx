import React from "react";
import i18n from "lang/i18n";

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
      <div
        onClick={() => {
          clickHandler("en");
        }}
      >
        English
      </div>
      <div style={{ paddingLeft: 10, paddingRight: 10 }}>↔</div>
      <div
        onClick={() => {
          clickHandler("ko");
        }}
      >
        한국어
      </div>
    </div>
  );
};

export default Translation;
