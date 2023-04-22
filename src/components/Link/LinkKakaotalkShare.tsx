import { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { kakaoSDKKey } from "loadenv";

type LinkKakaotalkShareProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonTo?: string;
  partNum?: number;
};

const LinkKakaotalkShare = ({
  children,
  title = "Taxi",
  description = "KAIST 구성원들의 택시 동승 인원 모집을 위한 서비스",
  buttonText = "사이트로 이동",
  buttonTo: _buttonTo,
  partNum,
}: LinkKakaotalkShareProps) => {
  const { pathname, search } = useLocation();
  const buttonTo = _buttonTo ?? pathname + search;

  useEffect(() => {
    // kakaotalk SDK script 추가
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // kakaotalk SDK script 제거
      document.body.removeChild(script);
    };
  }, []);
  const onClick = useCallback(() => {
    const kakao = window.Kakao;
    const webUrl = "https://taxi.dev.sparcs.org";
    if (!kakao) {
      console.error("Kakao SDK is not loaded.");
      return;
    }
    if (!kakaoSDKKey) {
      console.error("Kakao SDK key is not set.");
      return;
    }
    if (!kakao.isInitialized()) {
      kakao.init(kakaoSDKKey);
    }
    kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title,
        description,
        imageUrl: `${webUrl}/graph.png`,
        imageWidth: 1024,
        imageHeight: 500,
        link: { webUrl, mobileWebUrl: webUrl }, // TODO : androidExecutionParams, iosExecutionParams 설정
      },
      social: partNum && { subscriberCount: partNum },
      buttons: [
        {
          title: buttonText,
          link: {
            mobileWebUrl: `${webUrl}${buttonTo}`,
            webUrl: `${webUrl}${buttonTo}`,
          },
        },
      ],
    });
  }, [title, description, buttonTo]);
  return <div onClick={onClick}>{children}</div>;
};

export default LinkKakaotalkShare;
