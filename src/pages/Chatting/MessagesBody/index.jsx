import PropTypes from "prop-types";
import { useMemo, useState } from "react";

import ChatDate from "./ChatDate";
import ChatInOut from "./ChatInOut";
import ChatSet from "./ChatSet";
import PopupReport from "./PopupReport";

import loginInfoAtom from "atoms/loginInfo";
import { useRecoilValue } from "recoil";

import moment from "tools/moment";

// Chat {
//   roomId: ObjectId, // 방의 objectId
//   authorId: ObjectId, // 작성자 objectId
//   authorName: String, // 작성자 닉네임 (사용자 입,퇴장 알림 등 전체 메시지일 때: null)
//   content: String, // 채팅 content
//   time: Date, // UTC 시각
//   type: String // 메시지 종류 (text|in|out|s3img)
//   authorProfileUrl: String
// }

const MessagesBody = (props) => {
  const { oid: userOid } = useRecoilValue(loginInfoAtom) || {};
  const [isOpen, setIsOpen] = useState(false);
  const [path, setPath] = useState("");
  const [name, setName] = useState("");
  const [reportedId, setReportedId] = useState("");

  const chats = useMemo(() => {
    const list = [];
    let momentCache = null;
    let chatsCache = null;
    const dateFormat = "YYYY.MM.DD";
    const minFormat = "YYYY.MM.DD HH:mm";

    const chatSetCommonProps = {
      authorId: userOid,
      isBottomOnScroll: props.isBottomOnScroll,
      scrollToBottom: props.scrollToBottom,
      setIsOpen,
      setPath,
      setName,
      setReportedId,
      isSideChat: props.layoutType === "sidechat",
    };

    props.chats.forEach((item) => {
      if (item.type === "inf-checkout") {
        if (chatsCache) {
          list.push(
            <ChatSet
              key={"chat" + chatsCache[0].time}
              chats={chatsCache}
              {...chatSetCommonProps}
            />
          );
        }
        chatsCache = null;

        list.push(<div key={"checkout" + momentCache} chatcheckout="true" />);
        return;
      }

      const currentMoment = moment(item.time);
      if (!momentCache) {
        momentCache = currentMoment.clone();
        momentCache.subtract(1, "years");
      }
      if (momentCache.format(dateFormat) !== currentMoment.format(dateFormat)) {
        if (chatsCache) {
          list.push(
            <ChatSet
              key={"chat" + chatsCache[0].time}
              chats={chatsCache}
              {...chatSetCommonProps}
            />
          );
          chatsCache = null;
        }

        list.push(
          <ChatDate key={"date" + currentMoment} date={currentMoment} />
        );
      }
      if (item.type === "in" || item.type === "out") {
        if (chatsCache) {
          list.push(
            <ChatSet
              key={"chat" + chatsCache[0].time}
              chats={chatsCache}
              {...chatSetCommonProps}
            />
          );
          chatsCache = null;
        }
        list.push(
          <ChatInOut
            key={"inout" + currentMoment}
            type={item.type}
            users={item.inOutNames}
          />
        );
      } else if (
        ["text", "s3img", "payment", "settlement", "account"].includes(
          item.type
        )
      ) {
        if (
          chatsCache &&
          (chatsCache[0].authorId !== item.authorId ||
            moment(chatsCache[0].time).format(minFormat) !==
              currentMoment.format(minFormat))
        ) {
          list.push(
            <ChatSet
              key={"chat" + chatsCache[0].time}
              chats={chatsCache}
              {...chatSetCommonProps}
            />
          );
          chatsCache = null;
        }
        if (!chatsCache) chatsCache = [];
        chatsCache.push(item);
      }
      momentCache = currentMoment.clone();
    });
    if (chatsCache) {
      list.push(
        <ChatSet
          key={"chatLast" + chatsCache[0].time}
          chats={chatsCache}
          {...chatSetCommonProps}
        />
      );
    }
    return list;
  }, [props.chats, userOid]);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <div
      className="chatting-body"
      css={{
        flexBasis: "1px",
        flexGrow: 1,
        position: "relative",
        overflow: "auto",
        boxSizing: "border-box",
        paddingBottom: "12px",
      }}
      ref={props.forwardedRef}
      onScroll={props.handleScroll}
    >
      {chats}
      <PopupReport
        isOpen={isOpen}
        onClose={onClose}
        path={path}
        name={name}
        reportedId={reportedId}
      />
    </div>
  );
};

MessagesBody.propTypes = {
  layoutType: PropTypes.string,
  chats: PropTypes.array,
  forwardedRef: PropTypes.any,
  handleScroll: PropTypes.func,
  isBottomOnScroll: PropTypes.func,
  scrollToBottom: PropTypes.func,
};

MessagesBody.defaultProps = {
  chats: [],
};

export default MessagesBody;
