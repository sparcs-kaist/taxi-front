import { Button, ButtonProps, Image, View, XGroup, styled } from "tamagui";

import Logo from "../../../assets/Logo.png";

const TaxiAppBar = styled(View, {
  backgroundColor: "$color1",
  height: 56,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 16,
  gap: 16,
});

type TaxiIconProps = {
  firstIcon: ButtonProps["icon"];
  secondIcon: ButtonProps["icon"];
};

const AppBar = ({ firstIcon, secondIcon }: TaxiIconProps) => {
  return (
    <TaxiAppBar>
      <Image source={Logo} />
      <XGroup>
        <XGroup.Item>
          <Button icon={firstIcon} />
        </XGroup.Item>
        <XGroup.Item>
          <Button icon={secondIcon} />
        </XGroup.Item>
      </XGroup>
    </TaxiAppBar>
  );
};

export default AppBar;
