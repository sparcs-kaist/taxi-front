import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { useHistory } from "react-router";
import RLayout from "../../Frame/ReactiveLayout/RLayout";
import PropTypes from "prop-types";
import { backServer } from "../../../serverconf";

import svgBack from "./svg_back.svg";
import svgMenu from "./svg_menu.svg";
import svgClose from "./svg_close.svg";
import svgCloseGray from "./svg_closeGray.svg";

const PopupToast = (props) => {
  const styleBgd = useSpring({
    position: "fixed",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "100%",
    zIndex: 130,
    background: `rgba(0,0,0,0.6)`,
    opacity: props.isOpen ? 1 : 0,
    pointerEvents: props.isOpen ? "auto" : "none",
  });
  const style = {
    background: "white",
    borderRadius: "15px",
  };
  const styleBtnClose = {
    position: "absolute",
    top: "10px",
    right: "10px",
    width: "24px",
    height: "24px",
  };
  const styleTextLay = {
    textAlign: "center",
  };
  const styleTxt1 = {
    fontSize: "16px",
    fontWeight: "bold",
  };
  const styleTxt2 = {
    fontSize: "16px",
    fontWeight: 300,
  };
  const styleTxt3 = {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#6E3678",
  };
  const styleTxtSub = {
    textAlign: "center",
    fontSize: "12px",
    fontWeight: 300,
    color: "#888888",
  };
  const styleBtmBtn = {
    width: "49%",
    height: "36px",
    lineHeight: "36px",
    textAlign: "center",
    fontSize: "16px",
    borderRadius: "8px",
    overflow: "hidden",
  };
  const styleBtmBtn1 = useSpring({
    color: "#888888",
    background: "#EEEEEE",
  });
  const styleBtmBtn2 = useSpring({
    color: "white",
    background: "#6E3678",
  });

  return (
    <animated.div style={styleBgd}>
      <div
        style={{ position: "absolute", top: "20%", left: "0px", width: "100%" }}
      >
        <RLayout.R1>
          <div style={style}>
            <div style={{ height: "30px" }}>
              <img
                src={svgCloseGray}
                alt="close"
                style={styleBtnClose}
                className="BTNC"
                onClick={() => props.onClick1()}
              />
            </div>
            <div style={styleTextLay}>
              <span style={styleTxt1}>탑승</span>
              <span style={styleTxt2}>을 </span>
              <span style={styleTxt3}>취소</span>
              <span style={styleTxt2}>하시겠습니까?</span>
            </div>
            <div style={styleTxtSub}>취소 후 재탑승이 가능합니다.</div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingLeft: "12px",
                paddingRight: "12px",
                paddingTop: "20px",
                paddingBottom: "12px",
              }}
            >
              <animated.div
                style={{ ...styleBtmBtn, ...styleBtmBtn1 }}
                className="BTNC"
                onClick={() => props.onClick1()}
              >
                돌아가기
              </animated.div>
              <animated.div
                style={{ ...styleBtmBtn, ...styleBtmBtn2 }}
                className="BTNC"
                onClick={() => props.onClick2()}
              >
                취소하기
              </animated.div>
            </div>
          </div>
        </RLayout.R1>
      </div>
    </animated.div>
  );
};
PopupToast.propTypes = {
  isOpen: PropTypes.bool,
  onClick1: PropTypes.func,
  onClick2: PropTypes.func,
};

const BtnBack = (props) => {
  const [isHover, setHover] = useState(false);
  const history = useHistory();
  const style = useSpring({
    position: "absolute",
    top: "17px",
    left: "10px",
    width: "50px",
    height: "50px",
    borderRadius: "25px",
    background: `rgba(0,0,0,${isHover ? 0.05 : 0})`,
    config: { duration: 100 },
  });
  const styleImg = {
    position: "absolute",
    top: "calc(50% - 15px)",
    left: "calc(50% - 15px)",
    width: "30px",
    height: "30px",
  };

  return (
    <animated.div
      style={style}
      className="BTNC"
      onClick={() => history.goBack()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img src={svgBack} alt="back" style={styleImg} />
    </animated.div>
  );
};

const BtnCancel = (props) => {
  const [isHover, setHover] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const style = useSpring({
    position: "absolute",
    top: "25px",
    right: "70px",
    height: "30px",
    lineHeight: "30px",
    borderRadius: "7px",
    background: `rgba(102,61,113,${isHover ? 1 : 0.9})`,
    color: "white",
    fontSize: "15px",
    fontWeight: 300,
    paddingLeft: "10px",
    paddingRight: "10px",
    opacity: props.isOpen ? 1 : 0,
    config: { duration: 100 },
  });

  const onClick = () => {
    if (props.info && props.isOpen) {
      setOpen(true);
    }
  };
  const onCancel = () => {};

  return (
    <>
      <PopupToast
        isOpen={isOpen}
        onClick1={() => setOpen(false)}
        onClick2={() => onCancel()}
      />
      <animated.div
        style={style}
        onClick={() => onClick()}
        className={props.isOpen ? "BTNC ND" : "ND"}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        탑승 취소
      </animated.div>
    </>
  );
};
BtnCancel.propTypes = {
  info: PropTypes.any,
  isOpen: PropTypes.bool,
};

const BtnMenu = (props) => {
  const [isHover, setHover] = useState(false);
  const style = useSpring({
    position: "absolute",
    top: "17px",
    right: "10px",
    width: "50px",
    height: "50px",
    borderRadius: "25px",
    background: `rgba(0,0,0,${isHover ? 0.05 : 0})`,
    config: { duration: 100 },
  });
  const styleImg = {
    position: "absolute",
    top: "calc(50% - 15px)",
    left: "calc(50% - 15px)",
    width: "30px",
    height: "30px",
  };

  return (
    <animated.div
      style={style}
      className="BTNC"
      onClick={props.onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img src={props.token ? svgClose : svgMenu} alt="menu" style={styleImg} />
    </animated.div>
  );
};
BtnMenu.propTypes = {
  onClick: PropTypes.func,
  token: PropTypes.bool,
};

const Info = (props) => {
  const style1 = {
    fontSize: "11px",
    fontWeight: 300,
    color: "#888888",
    textAlign: props.align,
  };
  const style2 = {
    fontSize: "13px",
    fontWeight: 300,
    color: "#323232",
    textAlign: props.align,
  };
  return (
    <div>
      <div style={style1}>{props.title}</div>
      <div style={style2}>{props.children}</div>
    </div>
  );
};
Info.propTypes = {
  title: PropTypes.string,
  children: PropTypes.string,
  align: PropTypes.string,
};

const User = (props) => {
  const style = {
    fontSize: "13px",
    fontWeight: 300,
    color: "#888888",
    height: "28px",
    lineHeight: "28px",
    position: "relative",
    paddingLeft: "40px",
    paddingRight: "7px",
  };
  const styleImg = {
    width: "28px",
    height: "28px",
    borderRadius: "14px",
    position: "absolute",
    top: "0px",
    left: "0px",
  };
  const styleBg = {
    position: "absolute",
    top: "1px",
    bottom: "1px",
    left: "33px",
    right: "0px",
    background: "#EEEEEE",
    borderRadius: "5px",
  };
  const styleNickname = {
    position: "absolute",
    top: "0px",
    right: "7px",
    height: "28px",
    lineHeight: "28px",
    fontSize: "13px",
    fontWeight: 300,
    color: "#888888",
  };

  return (
    <div style={style}>
      <img
        style={styleImg}
        src={`${backServer}/static/profile-images/${props.id}`}
        alt=""
      />
      <div style={styleBg} />
      <div style={styleNickname}>{props.nickname}</div>
      {props.nickname}
    </div>
  );
};
User.propTypes = {
  id: PropTypes.string,
  nickname: PropTypes.string,
};

const transDate = (x) => {
  const date = new Date(x);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const week = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
  const hour = date.getHours();
  const min = date.getMinutes();
  return `${year}년 ${month}월 ${day}일(${week}) ${
    hour >= 12 ? "오후" : "오전"
  } ${hour > 12 ? hour - 12 : hour}시 ${min}분`;
};
const HeaderBottom = (props) => {
  const part = props.info ? props.info.part : [];
  const madeat = props.info ? transDate(props.info.madeat) : "";
  const styleLay1 = {
    marginLeft: "25px",
    marginRight: "25px",
    display: "flex",
    flexWrap: "wrap",
    gap: "5px 15px",
    justifyContent: "space-between",
  };
  const styleLay1Right = {
    display: "flex",
    flexWrap: "wrap",
    gap: "5px 15px",
  };
  const styleLay2 = {
    marginLeft: "25px",
    marginRight: "25px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "5px 10px",
  };

  // part.push({ id: '1234', nickname: 'hello world' }) // for test
  // console.log(props.info);
  return (
    <div className="chatting-header-bottom">
      <div style={{ height: "10px" }} />
      <div style={styleLay1}>
        <Info title="출발 시각 & 날짜" align="left">
          {madeat}
        </Info>
        <div style={styleLay1Right}>
          <Info title="개설자" align="right">
            어궁동 패티
          </Info>
          <Info title="결제자" align="right">
            결제 미완료
          </Info>
          <Info title="정산 여부" align="right">
            No
          </Info>
        </div>
      </div>
      <div style={{ height: "20px" }} />
      <div style={styleLay2}>
        {part.map((item, index) => (
          <User key={index} id={item.id} nickname={item.nickname} />
        ))}
      </div>
      <div style={{ height: "20px" }} />
    </div>
  );
};
HeaderBottom.propTypes = {
  info: PropTypes.any,
};

const Header = (props) => {
  const [isOpen, setOpen] = useState(false);
  const [btmSize, setBtmSize] = useState(114);
  const style = useSpring({
    position: "fixed",
    top: "0px",
    left: "0px",
    width: "100%",
    height: isOpen ? `${80 + btmSize}px` : "80px",
    background: "white",
    overflow: "hidden",
    boxShadow: "0px 0px 12px rgba(0,0,0,0.1)",
  });
  const styleLine = {
    width: "100%",
    height: "5px",
    background: "rgb(102,61,113)",
  };
  const styleBgd = useSpring({
    position: "fixed",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "100%",
    background: `rgba(0,0,0,${isOpen ? 0.6 : 0})`,
    pointerEvents: isOpen ? "auto" : "none",
  });
  const styleTitle = {
    position: "absolute",
    top: "17px",
    left: "70px",
    right: "70px",
    fontSize: "21px",
    fontWeight: 800,
    color: "rgb(102,61,113)",
  };
  const styleSubtitle = {
    position: "absolute",
    top: "45px",
    left: "70px",
    right: "70px",
    fontSize: "13px",
    fontWeight: 300,
    color: "#888888",
  };
  const styleBorder = {
    height: "1px",
    marginLeft: "15px",
    marginRight: "15px",
    backgroundImage:
      "linear-gradient(to right, #C8C8C8 50%, rgba(255,255,255,0) 0%)",
    backgroundPosition: "bottom",
    backgroundSize: "15px 1px",
    backgroundRpeat: "repeat-x",
  };

  useEffect(() => {
    const resizeEvent = () => {
      //const _bodyWidth = document.body.clientWidth;
      const btmLay = document.getElementsByClassName("chatting-header-bottom");
      if (btmLay.length > 0) {
        const _btmSize = btmLay[0].offsetHeight;
        if (btmSize !== _btmSize) setBtmSize(_btmSize);
      }
    };
    resizeEvent();
    window.addEventListener("resize", resizeEvent);

    return () => {
      window.removeEventListener("resize", resizeEvent);
    };
  }, []);

  return (
    <>
      <animated.div style={styleBgd} onClick={() => setOpen(false)} />
      <animated.div style={style}>
        <div style={{ position: "relative", height: "80px" }}>
          <div style={styleLine} />
          <div style={styleTitle}>{props.info ? props.info.name : ""}</div>
          <div style={styleSubtitle}>
            {props.info ? `${props.info.from} → ${props.info.to}` : ""}
          </div>
          <BtnBack />
          <BtnCancel info={props.info} isOpen={isOpen} />
          <BtnMenu token={isOpen} onClick={() => setOpen(!isOpen)} />
        </div>
        <div style={styleBorder} />
        <HeaderBottom info={props.info} />
      </animated.div>
    </>
  );
};
Header.propTypes = {
  info: PropTypes.any,
};

export default Header;
