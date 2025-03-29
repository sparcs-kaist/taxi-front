import { createFont, createTamagui, createTokens } from "tamagui";

import { themes } from "./themas";

/**
 * 택시 서비스에서 사용하는 폰트 셋입니다.
 * @summary
 * SpoqaHanSansNeoMedium와 SpoqaHanSansNeoBold를 사용합니다.
 * @description
 * 1: Extra Small, 2: Small, 3: Small Bold, 4: Regular, 5: Regular Bold, 6: Medium, 7: Medium Bold, 8: Large, 9: Large Bold, 10: Extra Large
 */
export const SpoqaFont = createFont({
  family: "SpoqaHanSansNeoMedium",
  size: {
    1: 10,
    2: 12,
    3: 12,
    4: 14,
    5: 14,
    6: 16,
    7: 16,
    8: 20,
    9: 20,
    10: 24,
  },
  lineHeight: {
    1: 12,
    2: 14,
    3: 14,
    4: 17,
    5: 17,
    6: 19,
    7: 19,
    8: 24,
    9: 24,
    10: 29,
  },
  weight: {
    1: "400",
    2: "400",
    3: "700",
    4: "400",
    5: "700",
    6: "400",
    7: "700",
    8: "400",
    9: "700",
    10: "700",
  },
  face: {
    400: { normal: "SpoqaHanSansNeoMedium" },
    700: { normal: "SpoqaHanSansNeoBold" },
  },
});

const size = {
  0: 0,
  1: 5,
  2: 10,
  true: 10,
};

export const tokens = createTokens({
  size,
  space: { ...size, "-1": -5, "-2": -10 },
  radius: { 0: 0, 1: 3 },
  zIndex: { 0: 0, 1: 100, 2: 200 },
  color: {
    white: "#fff",
    black: "#000",
  },
});
const appConfig = createTamagui({
  fonts: {
    // for tamagui, heading and body are assumed
    heading: SpoqaFont,
    body: SpoqaFont,
  },
  themes: themes,
  tokens,
});
export type AppConfig = typeof appConfig;
declare module "tamagui" {
  // or '@tamagui/core'

  // overrides TamaguiCustomConfig so your custom types

  // work everywhere you import `tamagui`

  interface TamaguiCustomConfig extends AppConfig {}
}
export default appConfig;
