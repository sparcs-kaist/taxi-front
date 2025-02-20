import { useEffect, useState } from "react";

import { useIsLogin, useValueRecoilState } from "@/hooks/useFetchRecoilState";
import { useAxios } from "@/hooks/useTaxiAPI";

import Button from "@/components/Button";
import { ModalEvent2025SpringShare } from "@/components/ModalPopup";
import WhiteContainer from "@/components/WhiteContainer";

import alertAtom from "@/atoms/alert";
import { useSetRecoilState } from "recoil";

import moment, { getToday } from "@/tools/moment";
import theme from "@/tools/theme";

const WhiteContainerSuggestShareEvent = () => {
  const isLogin = useIsLogin();
  const { isAgreeOnTermsOfEvent } =
    useValueRecoilState("event2025SpringInfo") || {};
  const [inviteUrl, setInviteUrl] = useState<string>("");
  const [isOpenShare, setIsOpenShare] = useState<boolean>(false);
  const axios = useAxios();
  const setAlert = useSetRecoilState(alertAtom);

  const today = getToday();
  const startDate = moment("2025-02-20", "YYYY-MM-DD");
  const endDate = moment("2025-03-13", "YYYY-MM-DD");
  const isEventDay = today.isBefore(endDate) && today.isAfter(startDate, "day");

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
    if (isAgreeOnTermsOfEvent && isEventDay)
      axios({
        url: `/events/2025spring/invites/create`,
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
            이벤트를 공유하여 친구가 이벤트에 참여하면, 친구와 함께 넙죽코인
            700개를 받을 수 있어요!
          </div>
          <Button
            type="purple"
            css={styleButton}
            onClick={() => {
              if (inviteUrl) setIsOpenShare(true);
              else if (isEventDay) {
                setAlert(
                  "이벤트를 공유하기 위해서는 이벤트에 참여해야 합니다."
                );
              } else {
                setAlert("이벤트 기간이 아닙니다.");
              }
            }}
          >
            이벤트 공유하기
          </Button>
          <ModalEvent2025SpringShare
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
