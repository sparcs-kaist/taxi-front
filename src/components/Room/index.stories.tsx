import type { Meta, StoryObj } from "@storybook/react";

import Room from "./index";

import theme from "tools/theme";

/*
Room.propTypes = {
  data: PropTypes.object,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  marginTop: PropTypes.string,
  marginBottom: PropTypes.string,
  theme: PropTypes.string,
};

Room.defaultProps = {
  seleted: false,
  onClick: () => {},
  marginTop: "0px",
  marginBottom: "0px",
};
*/

const meta: Meta<typeof Room> = {
  component: Room,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    selected: {
      control: {
        type: "boolean",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Room>;

export const Primary: Story = {
  args: {
    selected: false,
    onClick: () => {
      alert("onClick!");
    },
    marginTop: "0px",
    marginBottom: "0px",
  },
};
