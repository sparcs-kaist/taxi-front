import React, { useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";
import { useHistory } from "react-router";
import RLayout from "components/Frame/ReactiveLayout/RLayout";
import PropTypes from "prop-types";
import axios from "components/Tool/axios";

import SparcsLogoBlack from "asset/SparcsLogoBlack.svg";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const Policy = () => {
  const styleT1 = {
    fontSize: "15px",
    fontWeight: "bold",
    paddingTop: "15px",
    paddingBottom: "15px",
  };
  const styleT2 = {
    fontSize: "15px",
    paddingLeft: "20px",
  };
  return (
    <div
      style={{
        paddingTop: "10px",
        paddingBottom: "20px",
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      <div style={styleT1}>제 1조. 택시의 목적</div>
      <div style={styleT2}>
        1. 택시는 KAIST 구성원의 원활하고 안전한 택시 동승을 위해 KAIST 학부
        동아리 SPARCS에서 제공하는 택시 동승 인원 모집 서비스입니다.
        <br />
        2. 1조 1항에서의 KAIST 구성원이란 교수, 교직원, 그리고 재학생과 졸업생
        등을 나타냅니다.
      </div>
      <div style={styleT1}>제 2조. 가입 및 탈퇴</div>
      <div style={styleT2}>
        1. 택시는 KAIST 구성원만 이용 가능합니다.
        <br />
        2. 택시는 SPARCS SSO를 통해 가입할 수 있습니다.
        <br />
        - SPARCS SSO에서 카이스트 통합인증으로 가입시 별도 승인 없이 바로 서비스
        이용이 가능합니다. (교수, 교직원, 재학생, 졸업생 등)
        <br />
        - SPARCS SSO에서 카이스트 통합인증 외 다른 방법으로 가입시 택시 운영진이
        승인해야만 서비스 이용이 가능합니다. (입주 업체 등)
        <br />
        3. 택시는 회원탈퇴 기능이 없습니다. 다만, 택시 운영진에게 회원 탈퇴를
        요청할 수 있습니다.
        <br />
        4. 다음의 경우에는 회원자격이 박탈될 수 있습니다.
        <br />
        - 카이스트 구성원이 아닌 것으로 밝혀졌을 경우
        <br />
        - Taxi 이용약관에 명시된 회원의 의무를 지키지 않은 경우
        <br />- 택시 이용 중 정보통신망 이용촉진 및 정보보호 등에 관한 법률 및
        관계 법령과 본 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우
      </div>
      <div style={styleT1}>제 3조. 회원의 의무</div>
      <div style={styleT2}>
        1. 회원은 택시 이용과 관련하여 다음의 행위를 하여서는 안 됩니다.
        <br />
        - SPARCS, 택시 운영진, 또는 특정 개인 및 단체를 사칭하는 행위
        <br />
        - 택시를 이용하여 얻은 정보를 원작자나 택시 운영진의 사전 승낙 없이
        복사, 복제, 변경, 번역, 출판, 방송, 기타의 방법으로 사용하거나 이를
        타인에게 제공하는 행위
        <br />
        - 다른 회원의 계정을 부정 사용하는 행위
        <br />
        - 타인의 명예를 훼손하거나 모욕하는 행위 <br />
        - 타인의 지적재산권 등의 권리를 침해하는 행위 <br />
        - 해킹행위 또는 컴퓨터바이러스의 유포 행위 <br />
        - 광고성 정보 등 일정한 내용을 지속적으로 전송하는 행위 <br />
        - 서비스의 안전적인 운영에 지장을 주거나 줄 우려가 있는 일체의 행위
        <br />
        - 범죄행위를 목적으로 하거나 기타 범죄행위와 관련된 행위 <br />
        - SPARCS의 동의 없이 택시를 영리목적으로 사용하는 행위 <br />
        - 기타 택시의 커뮤니티 강령에 반하거나 택시 서비스 운영상 부적절하다고
        판단하는 행위 <br />
        2. 회원은 택시 이용시 모든 상황에서 다음의 커뮤니티 강령을 유의해야
        합니다. <br />
        - 언제나 스스로의 말에 책임감을 가져주시기 바랍니다.
        <br />
        - KAIST 인권윤리센터의 방침에 따라 증오와 차별 표현은 지양해주시고,
        국가인권위원회법이 규정한 평등권 침해의 차별행위가 포함되지 않도록
        부탁드립니다. <br />
        - 국가인권위원회법이 금지하는 차별행위 19가지 <br />
        - 글에 욕설/비속어/은어를 자제해주시기 바랍니다. <br />- 글에 상대방이
        불쾌감을 느낄 수 있는 표현, 일체의 성적 대상화를 자제해주시기 바랍니다.
      </div>
      <div style={styleT1}>제 4조. 책임의 제한</div>
      <div style={styleT2}>
        1. SPARCS는 다음의 사유로 서비스 제공을 중지하는 것에 대해 책임을 지지
        않습니다.
        <br />
        - 설비의 보수 등을 위해 부득이한 경우
        <br />
        - KAIST가 전기통신서비스를 중지하는 경우
        <br />
        - 천재지변, 정전 및 전시 상황인 경우
        <br />
        - 기타 본 서비스를 제공할 수 없는 사유가 발생한 경우
        <br />
        2. SPARCS는 다음의 사항에 대해 책임을 지지 않습니다.
        <br />
        - 개재된 회원들의 글에 대한 신뢰도, 정확도
        <br />
        - 택시를 매개로 회원 상호 간 및 회원과 제 3자 간에 발생한 분쟁
        <br />
        - 기타 택시 사용 중 발생한 피해 및 분쟁
        <br />
        3. 법적 수사 요청이 있는 경우, SPARCS는 수사기관에 회원 개인정보를
        제공할 수 있습니다.
      </div>
      <div style={styleT1}>제 5조. 문의 및 제보</div>
      <div style={styleT2}>
        1. 택시에 대한 건의사항 또는 버그에 대한 사항은 구글폼을 통해 문의 및
        제보할 수 있습니다.
        {/* 위, 수정 필요 */}
      </div>
      <div style={styleT1}>제 6조. 게시, 개정 및 해석</div>
      <div style={styleT2}>
        1. 택시 운영진은 본 약관에 대해 택시 회원가입시 회원의 동의를 받습니다.
        <br />
        2. 택시 운영진은 약관의규제에관한법률,
        정보통신망이용촉진및정보보호등에관한법률 등 관련법을 위배하지 않는
        범위에서 본 약관을 개정할 수 있습니다.
        <br />
        {/* 3. 본 약관을 개정하는 경우 적용일자, 개정 내용 및 사유를
                명시하여 개정 약관의 적용일자 7일 전부터 적용일자 전일까지 택시의
                '뉴택시 공지' 게시판을 통해 공지합니다. <br /> */}
        4. 회원은 개정약관이 공지된 지 7일 내에 개정약관에 대한 거부의
        의사표시를 할 수 있습니다. 이 경우 회원은 택시 운영진에게 문의하여 즉시
        사용 중인 모든 지원 서비스를 해지하고 본 서비스에서 회원 탈퇴할 수
        있습니다. <br />
        5. 택시 운영진은 개정약관이 공지된 지 7일 내에 거부의 의사표시를 하지
        않은 회원에 대해 개정약관에 대해 동의한 것으로 간주합니다. <br />
        6. 본 약관의 해석은 택시 운영진이 담당하며, 분쟁이 있을 경우 민법 등
        관계 법률과 관례에 따릅니다.
      </div>
      <div style={styleT1}>본 약관은 2022-04-26부터 적용됩니다.</div>
    </div>
  );
};

const LayBottom = (props) => {
  const styleBtn1 = useSpring({
    float: "right",
    height: "36px",
    width: "77px",
    lineHeight: "36px",
    textAlign: "center",
    borderRadius: "8px",
    background: "#6E3678",
    fontSize: "15px",
    color: "white",
  });
  const styleBtn2 = useSpring({
    float: "right",
    marginRight: "10px",
    height: "36px",
    width: "77px",
    lineHeight: "36px",
    textAlign: "center",
    borderRadius: "8px",
    background: "#EEEEEE",
    fontSize: "15px",
    color: "#888888",
  });

  const onAgree = async () => {
    const result = await axios.post("/users/agreeOnTermsOfService");
    if (result.status !== 200) {
      alert("약관 동의에 실패하였습니다.");
      return;
    }
    props.onAgree();
  };

  if (props.didAgree === undefined) return null;
  if (props.didAgree === true) {
    return (
      <div style={{ position: "relative" }}>
        <div style={{ textAlign: "right" }}>이미 동의하셨습니다.</div>
      </div>
    );
  } else {
    return (
      <div style={{ position: "relative" }}>
        <animated.div style={styleBtn1} className="BTNC ND" onClick={onAgree}>
          동의
        </animated.div>
        <animated.div
          onClick={props.onClose}
          style={styleBtn2}
          className="BTNC ND"
        >
          취소
        </animated.div>
      </div>
    );
  }
};
LayBottom.propTypes = {
  didAgree: PropTypes.any,
  onClose: PropTypes.func,
  onAgree: PropTypes.func,
};

const PopupPolicy = (props) => {
  const history = useHistory();
  const [didAgree, setDIdAgree] = useState(undefined);

  useEffect(() => {
    axios.get("/json/logininfo/detail").then(({ data }) => {
      setDIdAgree(data.agreeOnTermsOfService);
    });
  }, []);

  const onClose = async () => {
    if (didAgree === null) return;
    if (didAgree === true) {
      props.onClose();
      return;
    }

    const response = await axios.get("/auth/logout");
    if (response.status === 200) {
      history.push("/login");
    } else {
      alert("로그아웃에 실패했습니다.");
    }
  };

  const styleBgd = useSpring({
    position: "fixed",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "100%",
    zIndex: 50,
    background: `rgba(0,0,0,0.6)`,
    opacity: props.isOpen ? 1 : 0,
    pointerEvents: props.isOpen ? "auto" : "none",
  });
  const style = {
    height: "100%",
    overflow: "hidden",
    background: "white",
    borderRadius: "15px",
  };
  const styleSparcs = {
    position: "absolute",
    top: "15px",
    left: "15px",
    width: "25px",
    height: "25px",
  };
  const styleTaxi = {
    position: "absolute",
    top: "15px",
    left: "39px",
    fontSize: "20px",
    fontWeight: "bold",
    height: "25px",
    lineHeight: "25px",
    color: "#6E3678",
  };
  const styleTitle = {
    fontSize: "18px",
    fontWeight: "bold",
    paddingLeft: "85px",
    height: "25px",
    lineHeight: "25px",
  };
  const styleClose = {
    position: "absolute",
    top: "10px",
    right: "10px",
    width: "24px",
    height: "24px",
  };
  const styleInnerBox = {
    position: "absolute",
    overflow: "auto",
    top: "55px",
    bottom: "66px",
    left: "15px",
    right: "15px",
    background: "#EEEEEE",
    borderRadius: "10px",
    boxShadow: "inset 2px 2px 5px -2px rgba(0, 0, 0, 0.075)",
  };

  return (
    <animated.div style={styleBgd}>
      <div
        style={{
          position: "absolute",
          top: "0px",
          left: "0px",
          width: "100%",
          height: "100%",
        }}
        onClick={onClose}
      />
      <div
        style={{
          position: "absolute",
          top: "120px",
          bottom: "40px",
          left: "0px",
          right: "0px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "0px",
            left: "0px",
            width: "100%",
            height: "100%",
          }}
          onClick={onClose}
        />
        <RLayout.R1 height="100%">
          <div style={style}>
            <img src={SparcsLogoBlack} alt="" style={styleSparcs} />
            <div style={styleTaxi}>Taxi</div>
            <div style={{ height: "15px" }} />
            <div style={styleTitle}>이용 약관</div>
            <CloseRoundedIcon style={styleClose} onClick={onClose} />
            <div style={styleInnerBox}>
              <Policy />
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "15px",
                left: "15px",
                right: "15px",
                height: "36px",
              }}
            >
              <LayBottom
                didAgree={didAgree}
                onClose={onClose}
                onAgree={() => props.onClose()}
              />
            </div>
          </div>
        </RLayout.R1>
      </div>
    </animated.div>
  );
};
PopupPolicy.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default PopupPolicy;
