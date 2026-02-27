import { CSSProperties, memo, useEffect, useMemo, useRef, useState } from "react";

import useHoverProps from "@/hooks/theme/useHoverProps";
import { useValueRecoilState } from "@/hooks/useFetchRecoilState";
import { useValueFavoriteRoutes } from "@/hooks/useFetchRecoilState/useFetchFavoriteRoutes";

import Button from "@/components/Button";
import DottedLine from "@/components/DottedLine";
import MiniCircle from "@/components/MiniCircle";
import Modal from "@/components/Modal";
import FlipButton from "@/components/ModalRoomOptions/FlipButton";
import WhiteContainer from "@/components/WhiteContainer";

import FavoriteRoutes from "../FavoriteRoutes";
import Picker from "./Picker";

import theme from "@/tools/theme";
import { getLocationName } from "@/tools/trans";
import { Location } from "@/types/location";

import StarIcon from "@mui/icons-material/Star";
import UnfoldLessRoundedIcon from "@mui/icons-material/UnfoldLessRounded";
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";

type PlaceOption = Location & {
  name: string;
};

type PopupInputProps = {
  isOpen: boolean;
  onClose: () => void;
  value?: string;
  handler: (value: string) => void;
  placeOptions: PlaceOption[];
};

const PopupInput = (props: PopupInputProps) => {
  const [value, setValue] = useState({
    place: props.value ?? props.placeOptions?.[0]?.name ?? "",
  });

  useEffect(() => {
    setValue({
      place: props.value ?? props.placeOptions?.[0]?.name ?? "",
    });
  }, [props.value, props.placeOptions]);

  const optionGroup = {
    place: props.placeOptions.map((x) => {
      return x.name;
    }),
  };

  const onClick = () => {
    props.handler(
      props.placeOptions.find((place) => place.name === value.place)?._id ?? ""
    );
    props.onClose();
  };
  const handler = (_: any, changedValue: string) => {
    if (changedValue && value.place !== changedValue)
      setValue({ place: changedValue });
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onChangeIsOpen={props.onClose}
      onEnter={onClick}
      displayCloseBtn={false}
    >
      <div style={{ height: "266px" }}>
        <div style={{ width: "calc(100% - 20px)", marginLeft: "10px" }}>
          <Picker
            optionGroups={optionGroup}
            valueGroups={value}
            onChange={handler}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "0px 10px",
          }}
        >
          <Button
            type="gray"
            css={{
              width: "calc(40% - 10px)",
              padding: "10px 0 9px",
              borderRadius: "8px",
              ...theme.font14,
            }}
            onClick={props.onClose}
          >
            취소
          </Button>
          <Button
            type="purple"
            css={{
              width: "60%",
              padding: "10px 0 9px",
              borderRadius: "8px",
              ...theme.font14_bold,
            }}
            onClick={onClick}
          >
            선택하기
          </Button>
        </div>
      </div>
    </Modal>
  );
};

type PlaceElementProps = {
  value?: string;
  type: "from" | "to";
  onClick: () => void;
};

const PlaceElement = (props: PlaceElementProps) => {
  const [hoverProps, isHover] = useHoverProps();

  const style = {
    width: "calc(50% - 10px)",
    background: isHover ? theme.gray_background : undefined,
    borderRadius: "6px",
    transitionDuration: theme.duration,
    overflow: "hidden",
    padding: "14px 0 6px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    ...theme.cursor(),
  } as CSSProperties;
  const styleType = {
    margin: "5px 0",
    textAlign: "center",
    color: props.value ? theme.gray_text : theme.black,
    ...theme.font12,
  } as CSSProperties;
  const styleTextGrid = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "39px",
  };
  const styleText = {
    ...theme.font16_bold,
    textAlign: "center",
    color: props.value ? theme.black : theme.gray_line,
    wordBreak: "keep-all" as const,
    maxHeight: "100%",
    overflow: "hidden",
  } as CSSProperties;
  return (
    <div style={style} onClick={props.onClick} {...hoverProps}>
      <MiniCircle type={props.type} isRequired={!props.value} />
      <div style={styleType}>{props.type === "from" ? "출발지" : "도착지"}</div>
      <div style={styleTextGrid}>
        <div style={styleText}>
          {props.value ??
            (props.type === "from" ? "어디서 가시나요?" : "어디로 가시나요?")}
        </div>
      </div>
    </div>
  );
};

type PlaceProps = {
  value: [string | undefined, string | undefined]; // Changed from array to tuple for better type safety, allowing undefined
  handler: (value: [string | undefined, string | undefined]) => void;
};

const Place = (props: PlaceProps) => {
  const [isPopup1, setPopup1] = useState(false);
  const [isPopup2, setPopup2] = useState(false);
  const taxiLocations = useValueRecoilState("taxiLocations") as Location[];
  const [isOpenFavorite, setIsOpenFavorite] = useState(false);
  const [placeValues, setPlaceValues] = useState<(string | null)[]>([
    null,
    null,
  ]); // FavoriteRoutes에 넘겨주기 위함
  const favoriteRef = useRef<HTMLDivElement>(null);
  const favoriteRoutes = useValueFavoriteRoutes();
  const [maxHeight, setMaxHeight] = useState<number | undefined>(0);

  useEffect(() => {
    if (isOpenFavorite) {
      setMaxHeight(favoriteRef.current?.scrollHeight);
    } else {
      setMaxHeight(0);
    }
  }, [isOpenFavorite, favoriteRoutes]);

  useEffect(() => {
    // FavoriteRoutes에 넘겨주기 위함
    const placeValues = [props.value[0] ?? null, props.value[1] ?? null];
    setPlaceValues(placeValues);
  }, [props.value]);

  const taxiLocationsWithName = useMemo(
    () =>
      taxiLocations.reduce<PlaceOption[]>((acc, place) => {
        acc.push({
          ...place,
          name: place.koName,
        });
        return acc;
      }, []),
    [taxiLocations]
  );

  const getPlaceName = (placeId?: string) => {
    if (!placeId) return undefined;
    const place = taxiLocationsWithName.find(
      (location) => location._id === placeId
    );
    return place && getLocationName(place, "ko");
  };

  const styleArrow = {
    width: "24px",
    height: "24px",
    fill: theme.purple,
    ...theme.cursor(),
  };

  const styleFavorite = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "8px",
  };

  const handleFavoriteHandler = (place: string[]) => {
      // FavoriteRoutes handler expects string[], but PlaceProps expects [string | undefined, string | undefined]
      // Assuming FavoriteRoutes returns valid IDs.
      props.handler([place[0], place[1]]);
  }

  return (
    <WhiteContainer style={{ padding: "10px" }}>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <PlaceElement
            value={getPlaceName(props.value[0])}
            onClick={() => setPopup1(true)}
            type="from"
          />
          <DottedLine direction="column" />
          <FlipButton
            onClick={() => props.handler([props.value[1], props.value[0]])}
            disabled={!props.value[0] && !props.value[1]}
          />
          <PlaceElement
            value={getPlaceName(props.value[1])}
            onClick={() => setPopup2(true)}
            type="to"
          />
        </div>
        <PopupInput
          isOpen={isPopup1}
          onClose={() => setPopup1(false)}
          value={getPlaceName(props.value[0])}
          handler={(x) => props.handler([x, props.value[1]])}
          placeOptions={taxiLocationsWithName}
        />
        <PopupInput
          isOpen={isPopup2}
          onClose={() => setPopup2(false)}
          value={getPlaceName(props.value[1])}
          handler={(x) => props.handler([props.value[0], x])}
          placeOptions={taxiLocationsWithName}
        />
      </div>
      <div
        style={{ ...styleFavorite, ...theme.cursor() } as CSSProperties}
        onClick={() => setIsOpenFavorite(!isOpenFavorite)}
      >
        <StarIcon style={{ fontSize: "16px", color: theme.purple }} />
        <div css={{ flexShrink: 0, color: theme.purple, ...theme.font14_bold }}>
          즐겨찾는 경로
        </div>
        <DottedLine />
        {isOpenFavorite ? (
          <UnfoldLessRoundedIcon style={styleArrow} />
        ) : (
          <UnfoldMoreRoundedIcon style={styleArrow} />
        )}
      </div>
      <div
        ref={favoriteRef}
        style={{
          maxHeight: maxHeight,
          transition: "max-height 0.3s ease-in-out",
          overflow: "hidden",
        }}
      >
        <FavoriteRoutes placeValues={placeValues} handler={handleFavoriteHandler} />
      </div>
    </WhiteContainer>
  );
};

export default memo(Place);
