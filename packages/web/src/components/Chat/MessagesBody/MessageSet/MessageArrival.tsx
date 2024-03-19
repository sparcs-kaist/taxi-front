import theme from "@/tools/theme";

type MessageArrivalProps = {
  color: CSS["color"];
};

const MessageArrival = ({ color }: MessageArrivalProps) => {
  const style = { width: "210px", padding: "10px" };
  const styleText = {
    wordBreak: "break-all" as any,
    whiteSpace: "pre-line" as any,
    ...theme.font14,
    color,
  };
  return (
    <div css={style}>
      <div css={styleText}>
        아직 정산 시작을 하지 않았거나 송금을 완료하지 않은 사용자가 있습니다.
        <br />
        <br />
        좌측하단의 <b>+ 버튼</b>을 눌러 뜨는 <b>정산하기</b> 또는{" "}
        <b>송금하기</b> 버튼을 눌러 정산 요청 또는 송금을 완료해주세요.
      </div>
    </div>
  );
};

export default MessageArrival;
