import type { Meta, StoryObj } from "@storybook/react";

import Footer from "./index";

import theme from "@/tools/theme";

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

const styleFooter = {
  // [231114] 이것이 적절한 표준 css인지 잘 모르겠습니다..
  padding: "14px",
  borderRadius: "12px",
  ...theme.font14,
};

export default meta;

type Story = StoryObj<typeof Footer>;

export const Primary: Story = {
  args: {
    type: "full",
  },
  render: (args) => <Footer {...args} css={styleFooter}></Footer>,
};
