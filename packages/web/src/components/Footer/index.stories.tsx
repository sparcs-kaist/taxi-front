import type { Meta, StoryObj } from "@storybook/react";

import Footer from "./index";

const meta: Meta<typeof Footer> = {
  component: Footer,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    type: {
      control: {
        type: "select",
        options: ["only-logo", "full", "event-2023fall"],
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Footer>;

export const Primary: Story = {
  args: {
    type: "full",
  },
  render: (args) => <Footer {...args}></Footer>,
};
