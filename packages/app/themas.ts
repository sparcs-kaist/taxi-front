import {
  blue,
  blueDark,
  gray,
  grayDark,
  green,
  greenDark,
  orange,
  orangeDark,
  pink,
  pinkDark,
  purple,
  purpleDark,
  red,
  redDark,
  yellow,
  yellowDark,
} from "@tamagui/colors";
import { createThemeBuilder } from "@tamagui/theme-builder";
import type { Variable } from "@tamagui/web";

const colorTokens = {
  light: {
    blue,
    gray,
    green,
    orange,
    pink,
    purple,
    red,
    yellow,
  },
  dark: {
    blue: blueDark,
    gray: grayDark,
    green: greenDark,
    orange: orangeDark,
    pink: pinkDark,
    purple: purpleDark,
    red: redDark,
    yellow: yellowDark,
  },
};

const lightShadowColor = "rgba(0,0,0,0.04)";
const lightShadowColorStrong = "rgba(0,0,0,0.085)";
const darkShadowColor = "rgba(0,0,0,0.2)";
const darkShadowColorStrong = "rgba(0,0,0,0.3)";

const darkColors = {
  ...colorTokens.dark.blue,
  ...colorTokens.dark.gray,
  ...colorTokens.dark.green,
  ...colorTokens.dark.orange,
  ...colorTokens.dark.pink,
  ...colorTokens.dark.purple,
  ...colorTokens.dark.red,
  ...colorTokens.dark.yellow,
};

const lightColors = {
  ...colorTokens.light.blue,
  ...colorTokens.light.gray,
  ...colorTokens.light.green,
  ...colorTokens.light.orange,
  ...colorTokens.light.pink,
  ...colorTokens.light.purple,
  ...colorTokens.light.red,
  ...colorTokens.light.yellow,
};

const color = {
  white0: "rgba(255,255,255,0)", // White
  white075: "rgba(255,255,255,0.75)",
  white05: "rgba(255,255,255,0.5)",
  white025: "rgba(255,255,255,0.25)",
  black0: "#000000",
  black075: "rgba(10,10,10,0.75)",
  black05: "rgba(10,10,10,0.5)",
  black025: "rgba(10,10,10,0.25)",
  white1: "#f8f7fa", // Tint Gray 50
  white2: "#f3f3f5", // Tint Gray 100
  white3: "#ececee", // Tint Gray 200
  white4: "#dfdee0", // Tint Gray 300
  white5: "#bcbbbd", // Tint Gray 400
  white6: "#9d9c9e", // Tint Gray 500
  white7: "#747475", // Tint Gray 600
  white8: "#606061", // Tint Gray 700
  white9: "#424142", // Tint Gray 800
  white10: "#212121", // Tint Gray 900
  white11: "#000000", // Black
  black1: "#212121", // Tint Gray 900
  black2: "#424142", // Tint Gray 800
  black3: "#606061", // Tint Gray 700
  black4: "#747475", // Tint Gray 600
  black5: "#9D9C9E", // Tint Gray 500
  black6: "#BCBBBD", // Tint Gray 400
  black7: "#DFDEE0", // Tint Gray 300
  black8: "#ECECEE", // Tint Gray 200
  black9: "#F3F3F5", // Tint Gray 100
  black10: "#F8F7FA", // Tint Gray 50
  black11: "#ffffff", // White
  deepPurple900: "#311B92",
  deepPurple800: "#4527A0",
  deepPurple700: "#512DA8",
  deepPurple600: "#5E35B1",
  deepPurple500: "#673AB7",
  deepPurple400: "#7E57C2",
  deepPurple300: "#9575CD",
  deepPurple200: "#B39DDB",
  deepPurple100: "#D1C4E9",
  deepPurple50: "#EDE7F6",
  redA700: "#D50000",
  redA400: "#FF1744",
  redA200: "#FF5252",
  redA100: "#FF8A80",
  blueA700: "#2962FF",
  blueA400: "#2979FF",
  blueA200: "#448AFF",
  blueA100: "#82B1FF",
  amberA700: "#FFAB00",
  amberA400: "#FFC400",
  amberA200: "#FFD740",
  amberA100: "#FFE57F",
  ...postfixObjKeys(lightColors, "Light"),
  ...postfixObjKeys(darkColors, "Dark"),
};

export const palettes = (() => {
  const transparent = (hsl: string, opacity = 0) =>
    hsl.replace(`%)`, `%, ${opacity})`).replace(`hsl(`, `hsla(`);

  const getColorPalette = (colors: Object): string[] => {
    const colorPalette = Object.values(colors);
    // make the transparent color vibrant and towards the middle
    const colorI = colorPalette.length - 4;

    // add our transparent colors first/last
    // and make sure the last (foreground) color is white/black rather than colorful
    // this is mostly for consistency with the older theme-base
    return [
      transparent(colorPalette[0], 0),
      transparent(colorPalette[0], 0.25),
      transparent(colorPalette[0], 0.5),
      transparent(colorPalette[0], 0.75),
      ...colorPalette,
      transparent(colorPalette[colorI], 0.75),
      transparent(colorPalette[colorI], 0.5),
      transparent(colorPalette[colorI], 0.25),
      transparent(colorPalette[colorI], 0),
    ];
  };

  const lightPalette = [
    color.white0,
    color.white075,
    color.white05,
    color.white025,
    color.white1,
    color.white2,
    color.white3,
    color.white4,
    color.white5,
    color.white6,
    color.white7,
    color.white8,
    color.white9,
    color.white10,
    color.white11,
    color.black075,
    color.black05,
    color.black025,
    color.black0,
    color.deepPurple50,
    color.deepPurple100,
    color.deepPurple200,
    color.deepPurple300,
    color.deepPurple400,
    color.deepPurple500,
    color.deepPurple600,
    color.deepPurple700,
    color.deepPurple800,
    color.deepPurple900,
    color.redA100,
    color.redA200,
    color.redA400,
    color.redA700,
    color.blueA100,
    color.blueA200,
    color.blueA400,
    color.blueA700,
    color.amberA100,
    color.amberA200,
    color.amberA400,
    color.amberA700,
  ];

  const darkPalette = [
    color.black0,
    color.black075,
    color.black05,
    color.black025,
    color.black1,
    color.black2,
    color.black3,
    color.black4,
    color.black5,
    color.black6,
    color.black7,
    color.black8,
    color.black9,
    color.black10,
    color.black11,
    color.white075,
    color.white05,
    color.white025,
    color.white0,
    color.deepPurple50,
    color.deepPurple100,
    color.deepPurple200,
    color.deepPurple300,
    color.deepPurple400,
    color.deepPurple500,
    color.deepPurple600,
    color.deepPurple700,
    color.deepPurple800,
    color.deepPurple900,
    color.redA100,
    color.redA200,
    color.redA400,
    color.redA700,
    color.blueA100,
    color.blueA200,
    color.blueA400,
    color.blueA700,
    color.amberA100,
    color.amberA200,
    color.amberA400,
    color.amberA700,
  ];

  const lightPalettes = objectFromEntries(
    objectKeys(colorTokens.light).map(
      (key) =>
        [`light_${key}`, getColorPalette(colorTokens.light[key])] as const
    )
  );

  const darkPalettes = objectFromEntries(
    objectKeys(colorTokens.dark).map(
      (key) => [`dark_${key}`, getColorPalette(colorTokens.dark[key])] as const
    )
  );

  const colorPalettes = {
    ...lightPalettes,
    ...darkPalettes,
  };

  return {
    light: lightPalette,
    dark: darkPalette,
    ...colorPalettes,
  };
})();

export const templates = (() => {
  const transparencies = 3;
  const deepPurple = 19;
  const red = 29;
  const blue = 33;
  const amber = 37;

  // templates use the palette and specify index
  // negative goes backwards from end so -1 is the last item
  const base = {
    background0: 0,
    background025: 1,
    background05: 2,
    background075: 3,
    color1: transparencies + 1,
    color2: transparencies + 2,
    color3: transparencies + 3,
    color4: transparencies + 4,
    color5: transparencies + 5,
    color6: transparencies + 6,
    color7: transparencies + 7,
    color8: transparencies + 8,
    color9: transparencies + 9,
    color10: transparencies + 10,
    color11: transparencies + 11,
    deepPurple50: deepPurple,
    deepPurple100: deepPurple + 1,
    deepPurple200: deepPurple + 2,
    deepPurple300: deepPurple + 3,
    deepPurple400: deepPurple + 4,
    deepPurple500: deepPurple + 5,
    deepPurple600: deepPurple + 6,
    deepPurple700: deepPurple + 7,
    deepPurple800: deepPurple + 8,
    deepPurple900: deepPurple + 9,
    red0: red,
    red100: red + 1,
    red200: red + 2,
    red300: red + 3,
    red400: red + 4,
    blue0: blue,
    blue100: blue + 1,
    blue200: blue + 2,
    blue300: blue + 3,
    amber0: amber,
    amber100: amber + 1,
    amber200: amber + 2,
    amber300: amber + 3,
    color0: -0,
    color025: -1,
    color05: -2,
    color075: -3,
    // the background, color, etc keys here work like generics - they make it so you
    // can publish components for others to use without mandating a specific color scale
    // the @tamagui/button Button component looks for `$background`, so you set the
    // dark_red_Button theme to have a stronger background than the dark_red theme.
    background: transparencies + 2,
    backgroundHover: transparencies + 2,
    backgroundPress: transparencies + 3,
    backgroundFocus: transparencies + 1,
    borderColor: transparencies + 4,
    borderColorHover: transparencies + 5,
    borderColorFocus: transparencies + 2,
    borderColorPress: transparencies + 4,
    color: -transparencies - 1,
    colorHover: -transparencies - 2,
    colorPress: -transparencies - 1,
    colorFocus: -transparencies - 2,
    colorTransparent: -0,
    placeholderColor: -transparencies - 4,
    outlineColor: -1,
  };

  const surface1 = {
    background: base.background + 1,
    backgroundHover: base.backgroundHover + 1,
    backgroundPress: base.backgroundPress + 1,
    backgroundFocus: base.backgroundFocus + 1,
    borderColor: base.borderColor + 1,
    borderColorHover: base.borderColorHover + 1,
    borderColorFocus: base.borderColorFocus + 1,
    borderColorPress: base.borderColorPress + 1,
  };

  const surface2 = {
    background: base.background + 2,
    backgroundHover: base.backgroundHover + 2,
    backgroundPress: base.backgroundPress + 2,
    backgroundFocus: base.backgroundFocus + 2,
    borderColor: base.borderColor + 2,
    borderColorHover: base.borderColorHover + 2,
    borderColorFocus: base.borderColorFocus + 2,
    borderColorPress: base.borderColorPress + 2,
  };

  const surface3 = {
    background: base.deepPurple50,
    borderColor: base.color0,
  };

  const surfaceActive = {
    background: base.deepPurple600,
    borderColor: base.color0,
  };

  const inverseSurface1 = {
    color: surface1.background,
    colorHover: surface1.backgroundHover,
    colorPress: surface1.backgroundPress,
    colorFocus: surface1.backgroundFocus,
    background: base.color,
    backgroundHover: base.colorHover,
    backgroundPress: base.colorPress,
    backgroundFocus: base.colorFocus,
    borderColor: base.color - 2,
    borderColorHover: base.color - 3,
    borderColorFocus: base.color - 4,
    borderColorPress: base.color - 5,
  };

  const inverseActive = {
    ...inverseSurface1,
    background: base.color - 2,
    backgroundHover: base.colorHover - 2,
    backgroundPress: base.colorPress - 2,
    backgroundFocus: base.colorFocus - 2,
    borderColor: base.color - 2 - 2,
    borderColorHover: base.color - 3 - 2,
    borderColorFocus: base.color - 4 - 2,
    borderColorPress: base.color - 5 - 2,
  };

  const alt1 = {
    color: base.color - 1,
    colorHover: base.colorHover - 1,
    colorPress: base.colorPress - 1,
    colorFocus: base.colorFocus - 1,
  };

  const alt2 = {
    color: base.color - 2,
    colorHover: base.colorHover - 2,
    colorPress: base.colorPress - 2,
    colorFocus: base.colorFocus - 2,
  };

  return {
    base,
    alt1,
    alt2,
    surface1,
    surface2,
    surface3,
    inverseSurface1,
    inverseActive,
    surfaceActive,
  };
})();

const shadows = {
  light: {
    shadowColor: lightShadowColorStrong,
    shadowColorHover: lightShadowColorStrong,
    shadowColorPress: lightShadowColor,
    shadowColorFocus: lightShadowColor,
  },
  dark: {
    shadowColor: darkShadowColorStrong,
    shadowColorHover: darkShadowColorStrong,
    shadowColorPress: darkShadowColor,
    shadowColorFocus: darkShadowColor,
  },
};

const nonInherited = {
  light: {
    ...lightColors,
    ...shadows.light,
  },
  dark: {
    ...darkColors,
    ...shadows.dark,
  },
};

const overlayThemeDefinitions = [
  {
    parent: "light",
    theme: {
      background: "rgba(0,0,0,0.5)",
    },
  },
  {
    parent: "dark",
    theme: {
      background: "rgba(0,0,0,0.9)",
    },
  },
];

const inverseSurface1 = [
  {
    parent: "active",
    template: "inverseActive",
  },
  {
    parent: "",
    template: "inverseSurface1",
  },
] as any;

const surface1 = [
  {
    parent: "active",
    template: "surfaceActive",
  },
  {
    parent: "",
    template: "surface1",
  },
] as any;

const surface2 = [
  {
    parent: "active",
    template: "surfaceActive",
  },
  {
    parent: "",
    template: "surface2",
  },
] as any;

const surface3 = [
  {
    parent: "active",
    template: "surfaceActive",
  },
  {
    parent: "",
    template: "surface3",
  },
] as any;

// --- themeBuilder ---

const themeBuilder = createThemeBuilder()
  .addPalettes(palettes)
  .addTemplates(templates)
  .addThemes({
    light: {
      template: "base",
      palette: "light",
      nonInheritedValues: nonInherited.light,
    },
    dark: {
      template: "base",
      palette: "dark",
      nonInheritedValues: nonInherited.dark,
    },
  })
  .addChildThemes({
    orange: {
      palette: "orange",
      template: "base",
    },
    yellow: {
      palette: "yellow",
      template: "base",
    },
    green: {
      palette: "green",
      template: "base",
    },
    blue: {
      palette: "blue",
      template: "base",
    },
    purple: {
      palette: "purple",
      template: "base",
    },
    pink: {
      palette: "pink",
      template: "base",
    },
    red: {
      palette: "red",
      template: "base",
    },
    gray: {
      palette: "gray",
      template: "base",
    },
  })
  .addChildThemes({
    alt1: {
      template: "alt1",
    },
    alt2: {
      template: "alt2",
    },
    active: {
      template: "surface3",
    },
  })
  .addChildThemes(
    {
      ListItem: {
        template: "surface1",
      },
      SelectTrigger: surface1,
      Card: surface1,
      Button: surface3,
      Checkbox: surface2,
      Switch: surface2,
      SwitchThumb: inverseSurface1,
      TooltipContent: surface2,
      DrawerFrame: {
        template: "surface1",
      },
      Progress: {
        template: "surface1",
      },
      RadioGroupItem: surface2,
      TooltipArrow: {
        template: "surface1",
      },
      SliderTrackActive: {
        template: "surface3",
      },
      SliderTrack: {
        template: "surface1",
      },
      SliderThumb: inverseSurface1,
      Tooltip: inverseSurface1,
      ProgressIndicator: inverseSurface1,
      SheetOverlay: overlayThemeDefinitions,
      DialogOverlay: overlayThemeDefinitions,
      ModalOverlay: overlayThemeDefinitions,
      Input: surface1,
      TextArea: surface1,
    },
    {
      avoidNestingWithin: ["alt1", "alt2"],
    }
  );

// --- themes ---

const themesIn = themeBuilder.build();

export type Theme = Record<keyof typeof templates.base, string> &
  typeof nonInherited.light;
export type ThemesOut = Record<keyof typeof themesIn, Theme>;
export const themes = themesIn as ThemesOut;

// --- utils ---

export function postfixObjKeys<
  A extends { [key: string]: Variable<string> | string },
  B extends string
>(
  obj: A,
  postfix: B
): {
  [Key in `${keyof A extends string ? keyof A : never}${B}`]:
    | Variable<string>
    | string;
} {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [`${k}${postfix}`, v])
  ) as any;
}

// a bit odd but keeping backward compat for values >8 while fixing below
export function sizeToSpace(v: number) {
  if (v === 0) return 0;
  if (v === 2) return 0.5;
  if (v === 4) return 1;
  if (v === 8) return 1.5;
  if (v <= 16) return Math.round(v * 0.333);
  return Math.floor(v * 0.7 - 12);
}

export function objectFromEntries<ARR_T extends EntriesType>(
  arr: ARR_T
): EntriesToObject<ARR_T> {
  return Object.fromEntries(arr) as EntriesToObject<ARR_T>;
}

export type EntriesType =
  | [PropertyKey, unknown][]
  | ReadonlyArray<readonly [PropertyKey, unknown]>;

export type DeepWritable<OBJ_T> = {
  -readonly [P in keyof OBJ_T]: DeepWritable<OBJ_T[P]>;
};
export type UnionToIntersection<UNION_T> = // From https://stackoverflow.com/a/50375286
  (UNION_T extends any ? (k: UNION_T) => void : never) extends (
    k: infer I
  ) => void
    ? I
    : never;

export type UnionObjectFromArrayOfPairs<ARR_T extends EntriesType> =
  DeepWritable<ARR_T> extends (infer R)[]
    ? R extends [infer key, infer val]
      ? { [prop in key & PropertyKey]: val }
      : never
    : never;
export type MergeIntersectingObjects<ObjT> = { [key in keyof ObjT]: ObjT[key] };
export type EntriesToObject<ARR_T extends EntriesType> =
  MergeIntersectingObjects<
    UnionToIntersection<UnionObjectFromArrayOfPairs<ARR_T>>
  >;

export function objectKeys<O extends Object>(obj: O) {
  return Object.keys(obj) as Array<keyof O>;
}
