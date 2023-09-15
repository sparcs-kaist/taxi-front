import Button from "components/Button";

import theme from "tools/theme";

type BodyChatReportDoneProps = {
  onChangeIsOpen?: (isOpen: boolean) => void;
};

const BodyChatReportDone = ({ onChangeIsOpen }: BodyChatReportDoneProps) => {
  const styleText = {
    ...theme.font12,
    color: theme.gray_text,
    margin: "0 8px 12px",
  };

  return (
    <>
      <div css={styleText}>
        <b css={{ color: theme.red_text }}>신고</b>가 <b>완료</b>되었습니다.
      </div>
      <div css={styleText}>
        신고 내역은 마이페이지에서 화인하실 수 있습니다.
      </div>
      <Button
        type="purple_inset"
        css={{
          padding: "10px 0 9px",
          borderRadius: "8px",
          ...theme.font14_bold,
        }}
        onClick={() => onChangeIsOpen?.(false)}
      >
        확인
      </Button>
    </>
  );
};

export default BodyChatReportDone;
