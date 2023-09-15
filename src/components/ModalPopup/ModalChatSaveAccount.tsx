import { useCallback, useEffect, useState } from "react";

import {
  useFetchRecoilState,
  useValueRecoilState,
} from "hooks/useFetchRecoilState";
import { useAxios } from "hooks/useTaxiAPI";

import Button from "components/Button";
import InputAcount from "components/Input/InputAccount";
import Modal from "components/Modal";

import alertAtom from "atoms/alert";
import { useSetRecoilState } from "recoil";

import theme from "tools/theme";

import WalletIcon from "@mui/icons-material/Wallet";

type ModalChatSaveAcountProps = Omit<
  Parameters<typeof Modal>[0],
  "padding" | "children" | "onEnter"
> & { account?: string };

const ModalChatSaveAcount = ({
  account: accountDefault = "",
  ...modalProps
}: ModalChatSaveAcountProps) => {
  const axios = useAxios();
  const setAlert = useSetRecoilState(alertAtom);
  const { account: accountOrigin } = useValueRecoilState("loginInfo") || {};
  const [account, setAccount] = useState<string>(accountDefault || "");
  const fetchLoginInfo = useFetchRecoilState("loginInfo");

  useEffect(() => setAccount(accountDefault || ""), [accountDefault]);

  const onSubmit = useCallback(() => {
    modalProps.onChangeIsOpen?.(false);
    axios({
      url: "/users/editAccount",
      method: "post",
      data: { account },
      onSuccess: () => fetchLoginInfo(),
      onError: () => setAlert("계좌번호 저장을 실패하였습니다."),
    });
  }, [account]);

  const styleTitle = {
    ...theme.font18,
    display: "flex",
    alignItems: "center",
    margin: "0 8px 12px",
  };
  const styleIcon = {
    fontSize: "21px",
    margin: "0 4px 0 0",
  };
  const styleText = {
    ...theme.font12,
    color: theme.gray_text,
    margin: "0 8px 12px",
  };

  return (
    <Modal {...modalProps} padding="16px 12px 12px" onEnter={onSubmit}>
      <div css={styleTitle}>
        <WalletIcon style={styleIcon} />
        계좌번호 저장
      </div>
      <div css={styleText}>
        {!accountOrigin || accountOrigin === ""
          ? "계좌번호를 저장하면 다음번 정산하기에서는 자동 입력되어 다시 계좌번호를 입력할 필요가 없어요. 계좌번호를 저장할까요?"
          : "저장된 계좌번호와 다른 번호가 정산하기에 입력되었어요. 저장된 계좌번호를 입력한 번호로 수정할까요? 다음번 정산하기에서는 저장된 번호가 자동 입력됩니다."}
      </div>
      <div
        css={{
          margin: "0 8px 12px",
          display: "flex",
          alignItems: "center",
          color: theme.gray_text,
          whiteSpace: "nowrap",
          ...theme.font14,
        }}
      >
        계좌번호
        <InputAcount
          value={account}
          onChangeValue={setAccount}
          css={{ width: "100%", marginLeft: "10px" }}
        />
      </div>
      <div
        css={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        <Button
          type="gray"
          css={{
            width: "calc(50% - 5px)",
            padding: "10px 0 9px",
            borderRadius: "8px",
            ...theme.font14,
          }}
          onClick={() => modalProps.onChangeIsOpen?.(false)}
        >
          돌아가기
        </Button>
        <Button
          type="purple_inset"
          css={{
            width: "calc(50% - 5px)",
            padding: "10px 0 9px",
            borderRadius: "8px",
            ...theme.font14_bold,
          }}
          onClick={onSubmit}
        >
          저장하기
        </Button>
      </div>
    </Modal>
  );
};

export default ModalChatSaveAcount;
