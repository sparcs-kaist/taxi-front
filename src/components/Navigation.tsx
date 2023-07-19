import { useState } from "react";

import theme from "tools/theme";

type Page = {
  key: string;
  name?: string;
  body: React.ReactNode;
};
type ButtonNavigationProps = {
  name: string;
  isSelected: boolean;
  onClick: () => void;
};
type NavigationProps = {
  pages: Array<Page>;
};

const OptionNavigation = ({
  name,
  isSelected,
  onClick,
}: ButtonNavigationProps) => (
  <div
    css={{
      ...theme.font12,
      borderRadius: "6px",
      padding: "5px 8px",
      ...theme.cursor(),
      color: isSelected ? theme.white : theme.gray_text,
      backgroundColor: isSelected ? theme.purple : theme.gray_background,
      boxShadow: isSelected
        ? theme.shadow_purple_button_inset
        : theme.shadow_gray_input_inset,
      transition: `all ${theme.duration} ease-in-out`,
    }}
    onClick={onClick}
  >
    {name}
  </div>
);

const Navigation = ({ pages }: NavigationProps) => {
  const [selected, setSelected] = useState(pages?.[0]?.key || "");
  return (
    <>
      <div
        css={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          margin: "0 8px 12px",
        }}
      >
        {pages.map(({ key, name }) => (
          <OptionNavigation
            key={key}
            name={name ?? key}
            isSelected={selected === key}
            onClick={() => setSelected(key)}
          />
        ))}
      </div>
      {pages.find(({ key }) => key === selected)?.body}
    </>
  );
};

export default Navigation;
