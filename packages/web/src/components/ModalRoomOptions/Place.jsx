import PropTypes from "prop-types";
import { memo, useEffect, useMemo, useState, useRef } from "react";

import useHoverProps from "@/hooks/theme/useHoverProps";
import { useValueRecoilState } from "@/hooks/useFetchRecoilState";

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

import StarIcon from "@mui/icons-material/Star";
import UnfoldLessRoundedIcon from "@mui/icons-material/UnfoldLessRounded";
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";

const PopupInput = (props) => {
  const [value, setValue] = useState({
    place: props.value ?? props.placeOptions?.[0]?.name ?? "",
  });

  useEffect(() => {
    setValue({
      place: props.value ?? props.placeOptions?.[0]?.name ?? "",
    });
  }, [props.value]);

  const optionGroup = {
    place: props.placeOptions.map((x) => {
      return x.name;
    }),
  };

  const onClick = () => {
    props.handler(
      props.placeOptions.find((place) => place.name === value.place)._id ?? null
    );
    props.onClose();
  };
  const handler = (_, changedValue) => {
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
PopupInput.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  value: PropTypes.string,
  handler: PropTypes.func,
  placeOptions: PropTypes.array,
};

const PlaceElement = (props) => {
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
  };
  const styleType = {
    margin: "5px 0",
    textAlign: "center",
    color: props.value ? theme.gray_text : theme.black,
    ...theme.font12,
  };
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
    wordBreak: "keep-all",
    maxHeight: "100%",
    overflow: "hidden",
  };
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
PlaceElement.propTypes = {
  value: PropTypes.string,
  type: PropTypes.oneOf(["from", "to"]),
  onClick: PropTypes.func,
};

const Place = (props) => {
  const [isPopup1, setPopup1] = useState(false);
  const [isPopup2, setPopup2] = useState(false);
  const taxiLocations = useValueRecoilState("taxiLocations");
  const [isOpenFavorite, setIsOpenFavorite] = useState(false);
  const [placeValues, setPlaceValues] = useState([null, null]); // FavoriteRoutes에 넘겨주기 위함
  const favoriteRef = useRef(null);

  useEffect(() => {
    // FavoriteRoutes에 넘겨주기 위함
    const placeValues = [props.value[0], props.value[1]];
    setPlaceValues(placeValues);
  }, [props.value]);

  const taxiLocationsWithName = useMemo(
    () =>
      taxiLocations.reduce((acc, place) => {
        acc.push({
          ...place,
          name: place.koName,
        });
        return acc;
      }, []),
    [taxiLocations]
  );

  const getPlaceName = (placeId) => {
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

  return (
    <WhiteContainer css={{ padding: "10px" }}>
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
      <div css={styleFavorite}>
        <StarIcon style={{ fontSize: "16px", color: theme.purple }} />
        <div css={{ flexShrink: 0, color: theme.purple, ...theme.font14_bold }}>
          즐겨찾는 경로
        </div>
        <DottedLine />
        {isOpenFavorite ? (
          <UnfoldLessRoundedIcon
            style={styleArrow}
            onClick={() => setIsOpenFavorite(false)}
          />
        ) : (
          <UnfoldMoreRoundedIcon
            style={styleArrow}
            onClick={() => setIsOpenFavorite(true)}
          />
        )}
      </div>
      <div
        ref={favoriteRef}
        style={{
          maxHeight: isOpenFavorite ? favoriteRef.current?.scrollHeight : 0,
          transition: "max-height 0.3s ease-in-out",
          overflow: "hidden",
        }}
      >
        <FavoriteRoutes placeValues={placeValues} handler={props.handler} />
      </div>
    </WhiteContainer>
  );
};
Place.propTypes = {
  value: PropTypes.array,
  handler: PropTypes.func,
  favoriteRoutes: PropTypes.object,
};

export default memo(Place);
