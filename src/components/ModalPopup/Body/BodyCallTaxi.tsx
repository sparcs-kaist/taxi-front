import ButtonShare from "@/components/Button/ButtonShare";
import DottedLine from "@/components/DottedLine";
import LinkCallTaxi from "@/components/Link/LinkCallTaxi";

import theme from "@/tools/theme";

import { ReactComponent as KakaoTaxiLogo } from "@/static/assets/serviceLogos/KakaoTaxiLogo.svg";
import TmoneyOndaLogo from "@/static/assets/serviceLogos/TmoneyOndaLogo.png";
import { ReactComponent as UTLogo } from "@/static/assets/serviceLogos/UTLogo.svg";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";

export type BodyCallTaxiProps = {
  roomInfo: Room;
  height?: number;
};

const BodyCallTaxi = ({ roomInfo, height }: BodyCallTaxiProps) => {
  const styleWrapper = height
    ? {
        height,
        display: "flex",
        flexDirection: "column" as any,
      }
    : {};
  const styleGuide = {
    ...theme.font12,
    color: theme.gray_text,
    margin: "0 8px 12px",
  };

  const styleButtonSection = {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    margin: "12px 0px 0",
  };

  const styleIcon = {
    width: "16px",
    height: "16px",
    fill: theme.gray_text,
  };

  const styleInfo = {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "12px",
  };

  return (
    <div css={styleWrapper}>
      <div css={styleGuide}>
        출발지와 도착지가 이미 설정된 상태로 택시 호출 앱을 실행할 수 있습니다.
        동승 인원과 출발지에서 모였다면, 버튼을 눌러 택시를 호출하세요.
      </div>
      <div css={styleInfo}>
        <LocationOnRoundedIcon style={styleIcon} />
        <div css={{ color: theme.gray_text, ...theme.font14_bold }}>
          {roomInfo.from?.koName}&nbsp; → &nbsp;{roomInfo.to?.koName}
        </div>
      </div>
      <DottedLine />
      <div css={{ flexGrow: 1 }} />
      <div css={styleButtonSection}>
        <LinkCallTaxi type="kakaotaxi" from={roomInfo.from} to={roomInfo.to}>
          <ButtonShare
            text="카카오택시"
            icon={<KakaoTaxiLogo css={{ width: "22px" }} />}
            background="#292140"
          />
        </LinkCallTaxi>
        <LinkCallTaxi type="ut" from={roomInfo.from} to={roomInfo.to}>
          <ButtonShare
            text="우티"
            icon={<UTLogo css={{ width: "22px" }} />}
            background="#000000"
          />
        </LinkCallTaxi>
        <LinkCallTaxi type="tmoneyonda" from={roomInfo.from} to={roomInfo.to}>
          <ButtonShare
            text="티머니온다"
            icon={
              <img
                src={TmoneyOndaLogo}
                css={{ width: "45px", borderRadius: "6px" }}
              />
            }
            background="#000000"
          />
        </LinkCallTaxi>
      </div>
    </div>
  );
};

export default BodyCallTaxi;
