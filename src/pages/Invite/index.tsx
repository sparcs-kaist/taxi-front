import { useEffect } from "react";
import { useParams } from "react-router-dom";

import Loading from "components/Loading";

import { getDynamicLink } from "tools/trans";

const Invite = () => {
  const { roomId } = useParams<{ roomId: string }>();

  useEffect(() => {
    // dynamic link로 웹에서 앱으로 이동가능할 시 이동합니다.
    window.location.href = getDynamicLink(`/home/${roomId}`);
  }, []);

  return <Loading center />;
};

export default Invite;
