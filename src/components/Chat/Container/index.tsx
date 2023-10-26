import HeaderBar from "@/components/Header/HeaderBar";
import { deviceType } from "@/tools/loadenv";

type ContainerProps = {
  layoutType: "sidechat" | "fullchat";
  children: React.ReactNode;
};

const Container = ({ layoutType, children }: ContainerProps) => {
  // const isVKDetected = useRecoilValue(isVirtualKeyboardDetectedAtom);

  // IOS #254 이슈 대응 크로스 브라우징
  const isIOSCrossBrowsing =
    deviceType.endsWith("/ios") && layoutType === "fullchat"; // && isVKDetected;
  // isVKDetected 옵션 사용시 리랜더링 됨

  return (
    <div
      css={{
        width: "100%",
        height: isIOSCrossBrowsing
          ? "var(--window-visual-height)"
          : "calc(100% - env(safe-area-inset-top) - env(safe-area-inset-bottom))",
        position: isIOSCrossBrowsing ? "fixed" : "absolute",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        bottom: "0px",
        left: "0px",
      }}
    >
      {isIOSCrossBrowsing && <HeaderBar position="absolute" />}
      {children}
    </div>
  );
};

export default Container;
