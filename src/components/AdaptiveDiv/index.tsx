import AdaptiveButterfly, { AdaptiveButterflyProps } from "./AdaptiveButterfly";
import AdaptiveCenter, { AdaptiveCenterProps } from "./AdaptiveCenter";
import AdaptiveModal, { AdaptiveModalProps } from "./AdaptiveModal";

type AdaptiveDivProps =
  | (AdaptiveButterflyProps & { type: "butterfly" })
  | (AdaptiveCenterProps & { type: "center" })
  | (AdaptiveModalProps & { type: "modal" });

const AdaptiveDiv = (props: AdaptiveDivProps) => {
  switch (props.type) {
    case "butterfly":
      return <AdaptiveButterfly {...props} />;
    case "center":
      return <AdaptiveCenter {...props} />;
    case "modal":
      return <AdaptiveModal {...props} />;
  }
};

export default AdaptiveDiv;
