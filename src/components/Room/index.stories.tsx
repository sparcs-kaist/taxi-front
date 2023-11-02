import type { Meta, StoryObj } from "@storybook/react";

import Room from "./index";

import loginInfoAtom from "@/atoms/loginInfo";
import { useSetRecoilState } from "recoil";

const MockRoom = () => {
  const atomSetState = useSetRecoilState(loginInfoAtom);
  atomSetState({
    oid: "64c118f5a6860842a1d4e27c",
    id: "sunday",
    name: "sunday-name",
    nickname: "sunday-mmd3289u324923u489",
    withdraw: false,
    ban: false,
    joinat: "2023-07-26T13:00:37.936Z",
    agreeOnTermsOfService: true,
    subinfo: {
      kaist: "20220001",
      sparcs: "",
      facebook: "",
      twitter: "",
    },
    email: "sunday@kaist.ac.kr",
    profileImgUrl: "default/GooseGreen.png",
    account: "NH농협 1324234233",
    deviceToken: "ExponentPushToken[123123123123123123123123]",
    refreshToken: "123123123123123123123123",
    accessToken: "123123123123123123123123",
  });

  return <Room />;
};

const meta: Meta<typeof MockRoom> = {
  component: MockRoom,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    seleted: {
      control: {
        type: "boolean",
      },
    },
    theme: {
      control: {
        type: "select",
        options: ["purple", "white"],
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof MockRoom>;

const data = {
  _id: "650882351f7c08d176f43e9e",
  name: "매일매일 택시",
  from: {
    _id: "64c118f5a6860842a1d4e287",
    enName: "Daejeon Station",
    koName: "대전역",
  },
  to: {
    _id: "64c118f5a6860842a1d4e295",
    enName: "Duck Pond",
    koName: "오리연못",
  },
  time: "2023-09-18T17:10:00.000Z",
  part: [
    {
      _id: "64c118f5a6860842a1d4e27c",
      name: "sunday-name",
      nickname: "sunday-mmd3289u324923u489",
      profileImageUrl: "default/GooseGreen.png",
      isSettlement: "not-departed",
      readAt: "2023-09-18T17:00:37.628Z",
    },
  ],
  madeat: "2023-09-18T17:00:37.628Z",
  settlementTotal: 0,
  maxPartLength: 4,
  __v: 0,
  isOver: false,
  isDeparted: true,
};

export const Primary: Story = {
  args: {
    data,
    selected: false,
    theme: "purple",
    marginTop: "15px",
    marginBottom: "15px",
  },
};
