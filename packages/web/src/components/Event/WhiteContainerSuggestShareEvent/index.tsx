import { useEffect, useState } from "react";

import { useIsLogin, useValueRecoilState } from "@/hooks/useFetchRecoilState";
import { useAxios } from "@/hooks/useTaxiAPI";

import Button from "@/components/Button";
import { ModalEvent2024FallShare } from "@/components/ModalPopup";
import WhiteContainer from "@/components/WhiteContainer";

import alertAtom from "@/atoms/alert";
import { useSetRecoilState } from "recoil";

import theme from "@/tools/theme";

const WhiteContainerSuggestShareEvent = () => {
  const isLogin = useIsLogin();
  const { isAgreeOnTermsOfEvent } =
    useValueRecoilState("event2024FallInfo") || {};
  const [inviteUrl, setInviteUrl] = useState<string>("");
  const [isOpenShare, setIsOpenShare] = useState<boolean>(false);
  const axios = useAxios();
  const setAlert = useSetRecoilState(alertAtom);

  const styleText = {
    ...theme.font14,
    marginBottom: "12px",
  };
  const styleButton = {
    padding: "14px 0 13px",
    borderRadius: "12px",
    ...theme.font14_bold,
  };

  useEffect(() => {
    if (isAgreeOnTermsOfEvent)
      axios({
        url: `/events/2024fall/invites/create`,
        method: "post",
        onSuccess: ({ inviteUrl }) => {
          setInviteUrl(inviteUrl);
        },
        onError: () => setAlert("초대 링크를 생성하지 못했습니다."),
      });
  }, [isAgreeOnTermsOfEvent]);

  return (
    <>
      {isLogin && isAgreeOnTermsOfEvent && (
        <WhiteContainer>
          <div css={styleText}>
            <b>🎊 이벤트 공유하기</b>
          </div>
          <div css={styleText}>
            이벤트를 공유하여 친구가 이벤트에 참여하면, 친구와 함께 송편코인
            700개를 받을 수 있어요!
          </div>
          <Button
            type="purple"
            css={styleButton}
            onClick={() => {
              if (inviteUrl) setIsOpenShare(true);
              else
                setAlert(
                  "이벤트를 공유하기 위해서는 이벤트에 참여해야 합니다."
                );
            }}
          >
            이벤트 공유하기
          </Button>
          <ModalEvent2024FallShare
            isOpen={isOpenShare}
            onChangeIsOpen={setIsOpenShare}
            inviteUrl={inviteUrl || ""}
          />
        </WhiteContainer>
      )}
    </>
  );
};

export default WhiteContainerSuggestShareEvent;
