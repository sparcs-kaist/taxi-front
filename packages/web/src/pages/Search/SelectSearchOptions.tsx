import { memo } from "react";

import useHoverProps from "@/hooks/theme/useHoverProps";

import theme from "@/tools/theme";

type SearchOptions = "place" | "date" | "time" | "maxPeople" | "name";
type SearchOptionsType = { [key in SearchOptions]: boolean };

type SearchOptionProps = {
  name: string;
  id: SearchOptions;
  selected: boolean;
  handler: (handler: (options: SearchOptionsType) => void) => void;
};
type SelectSearchOptionsProps = {
  options: SearchOptionsType;
  handler: SearchOptionProps["handler"];
};

const searchOptions: Array<{ name: string; id: SearchOptions }> = [
  { name: "장소", id: "place" },
  { name: "날짜", id: "date" },
  { name: "시간", id: "time" },
  { name: "최대 인원", id: "maxPeople" },
  { name: "방 이름", id: "name" },
];

const SearchOption = (props: SearchOptionProps) => {
  const [hoverProps, isHover] = useHoverProps();
  const onClick = () =>
    props.handler((options: SearchOptionsType) => {
      options[props.id] = !props.selected;
      if (!options.date && options.time) {
        if (props.id === "date") options.time = false;
        if (props.id === "time") options.date = true;
      }
      return { ...options };
    });
  return (
    <div
      css={{
        ...theme.font12,
        borderRadius: "15px",
        padding: "8px 15px 7px 15px",
        boxShadow: theme.shadow,
        background: props.selected
          ? isHover
            ? theme.purple_dark
            : theme.purple
          : isHover
          ? theme.purple_hover
          : theme.white,
        color: props.selected ? theme.white : theme.black,
        transition: `background ${theme.duration}`,
        ...theme.cursor(),
      }}
      onClick={onClick}
      {...hoverProps}
    >
      {props.name}
    </div>
  );
};
const MemoizedSearchOption = memo(SearchOption);

const SelectSearchOptions = ({
  options,
  handler,
}: SelectSearchOptionsProps) => (
  <div
    css={{
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      paddingTop: "10px",
      paddingBottom: "15px",
    }}
  >
    {searchOptions.map(({ id, name }) => (
      <MemoizedSearchOption
        key={id}
        id={id}
        handler={handler}
        selected={options[id] ?? false}
        name={name}
      />
    ))}
  </div>
);

export default memo(SelectSearchOptions);
