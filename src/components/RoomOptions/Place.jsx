import PropTypes from "prop-types";
import { memo, useMemo, useState } from "react";

import Button from "components/Button";
import DottedLine from "components/DottedLine";
import MiniCircle from "components/MiniCircle";
import Modal from "components/Modal";
import WhiteContainer from "components/WhiteContainer";

import Picker from "./Picker";

import taxiLocationAtom from "atoms/taxiLocation";
import { useRecoilValue } from "recoil";

import hoverEventSet from "tools/hoverEventSet";
import theme from "tools/theme";
import { getLocationName } from "tools/trans";

const PopupInput = (props) => {
  const [value, setValue] = useState({
    place: props.value ?? props.placeOptions?.[0]?.name ?? "",
  });

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
            width="calc(40% - 10px)"
            padding="10px 0 9px"
            radius={8}
            font={theme.font14}
            onClick={props.onClose}
          >
            취소
          </Button>
          <Button
            type="purple"
            width="60%"
            padding="10px 0 9px"
            radius={8}
            font={theme.font14_bold}
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
  const [isHover, setHover] = useState(false);

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
    <div style={style} onClick={props.onClick} {...hoverEventSet(setHover)}>
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
  const taxiLocation = useRecoilValue(taxiLocationAtom);
  const taxiLocationWithName = useMemo(
    () =>
      taxiLocation.reduce((acc, place) => {
        acc.push({
          ...place,
          name: place.koName,
        });
        return acc;
      }, []),
    [taxiLocation]
  );

  const getPlaceName = (placeId) => {
    const place = taxiLocationWithName.find(
      (location) => location._id === placeId
    );
    return place && getLocationName(place, "ko");
  };

  return (
    <WhiteContainer padding="10px">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <PlaceElement
          value={getPlaceName(props.value[0])}
          onClick={() => setPopup1(true)}
          type="from"
        />
        <DottedLine direction="column" />
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
        placeOptions={taxiLocationWithName}
      />
      <PopupInput
        isOpen={isPopup2}
        onClose={() => setPopup2(false)}
        value={getPlaceName(props.value[1])}
        handler={(x) => props.handler([props.value[0], x])}
        placeOptions={taxiLocationWithName}
      />
    </WhiteContainer>
  );
};
Place.propTypes = {
  value: PropTypes.array,
  handler: PropTypes.func,
};

export default memo(Place);
