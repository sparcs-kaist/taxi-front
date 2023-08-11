import taxiLocationsAtom from "atoms/taxiLocations";
import { useRecoilValue } from "recoil";

type LinkCallTaxiProps = {
  children: React.ReactNode;
  type: "kakaotaxi" | "tmoneyonda" | "ut";
  from: string;
  to: string;
};

const LinkCallTaxi = ({ children, type, from, to }: LinkCallTaxiProps) => {
  const taxiLocations = useRecoilValue(taxiLocationsAtom);
  const origin = taxiLocations.find((loc) => loc.koName === from);
  const dest = taxiLocations.find((loc) => loc.koName === to);
  const deeplink = (() => {
    switch (type) {
      case "kakaotaxi":
        return `kakaot://taxi/set?dest_lng=${dest?.longitude}&dest_lat=${dest?.latitude}&origin_lng=${origin?.longitude}&origin_lat=${origin?.latitude}`;
      case "tmoneyonda":
        return "tmoneyonda://main";
      case "ut":
        return `uber://?action=setPickup&client_id=a&pickup[formatted_address]=${origin?.koName}&pickup[latitude]=${origin?.latitude}&pickup[longitude]=${origin?.longitude}&dropoff[formatted_address]=${dest?.koName}&dropoff[latitude]=${dest?.latitude}&dropoff[longitude]=${dest?.longitude}`;
    }
  })();

  return (
    <a href={deeplink} css={{ textDecoration: "none" }}>
      {children}
    </a>
  );
};

export default LinkCallTaxi;
