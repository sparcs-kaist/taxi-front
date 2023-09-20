import Button from "components/Button";
import DottedLine from "components/DottedLine";
import Modal from "components/Modal";

import theme from "tools/theme";

import LocalAtmRoundedIcon from "@mui/icons-material/LocalAtmRounded";
import { ReactComponent as CreditIcon } from "static/events/2023fallCredit.svg";

const Background = () => (
  <div css={{ position: "absolute", top: "20%", left: 0, bottom: 0, right: 0 }}>
    <div className="c2023fallevent-before"></div>
    <div className="c2023fallevent-after"></div>
  </div>
);

type ModalEvent2023FallMissionCompleteProps = Parameters<typeof Modal>[0];

const ModalEvent2023FallMissionComplete = ({
  ...modalProps
}: ModalEvent2023FallMissionCompleteProps) => {
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
  const styleBody = {
    margin: "0 8px 12px",
    position: "relative" as const,
    display: "flex",
    gap: "12px",
  };
  const styleImageWrap = {
    flexGrow: 0,
    width: "25%",
    aspectRatio: "1 / 1",
    border: `2px solid #EEEEEE`,
    borderRadius: "10px",
    overflow: "hidden",
  };
  const styleDescription = {
    width: 0,
    flexGrow: 1,
    ...theme.font12,
    color: theme.gray_text,
  };
  const styleButtons = {
    position: "relative" as const,
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  };

  return (
    <Modal
      css={{ padding: "16px 12px 12px", overflow: "hidden" }}
      backgroundChildren={<Background />}
      {...modalProps}
    >
      <div css={styleTitle}>
        <LocalAtmRoundedIcon style={styleIcon} />
        [퀘스트 완료] 정산해요 택시의 숲
      </div>
      <div css={styleBody}>
        <div css={styleImageWrap}></div>
        <div css={styleDescription}>
          2명 이상 탑승하고 정산 완료하기 여기는 미션 설명을 위한 공간입니다
          최대 세 줄까지 들어가도록 해볼게요
        </div>
      </div>
      <DottedLine />
      <div
        css={{
          margin: "12px 8px",
          display: "flex",
          gap: "8px",
          alignItems: "center",
          justifyContent: "end",
        }}
      >
        <CreditIcon style={{ width: "27px", height: "16px" }} />
        <div css={{ color: theme.black, ...theme.font16_bold }}>100 획득</div>
      </div>
      <div css={styleButtons}>
        <Button
          type="purple_inset"
          css={{
            width: "calc(50% - 5px)",
            padding: "10px 0 9px",
            borderRadius: "8px",
            ...theme.font14_bold,
          }}
        >
          퀘스트 바로가기
        </Button>
        <Button
          type="purple_inset"
          css={{
            width: "calc(50% - 5px)",
            padding: "10px 0 9px",
            borderRadius: "8px",
            ...theme.font14_bold,
          }}
        >
          상점 바로가기
        </Button>
      </div>
    </Modal>
  );
};

export default ModalEvent2023FallMissionComplete;
