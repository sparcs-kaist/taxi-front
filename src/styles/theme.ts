export type Font = {
  fontSize: number;
  letterSpacing?: number;
  fontWeight?: number;
};

export const theme = {
  // Color
  black: "#323232",
  black_40: "rgba(0, 0, 0, 0.4)",
  black_60: "rgba(0, 0, 0, 0.6)",
  white: "#FFFFFF",

  purple: "#6E3678",
  purple_disabled: "#B89DBD",
  purple_dark: "#572A5E",
  purple_light: "#FAF6FB",
  purple_background: "#FAF8FB",
  purple_hover: "#F4EAF6",

  gray_text: "#888888",
  gray_background: "#EEEEEE",
  gray_line: "#C8C8C8",

  red_text: "#DD616E",
  red_button: "#91313B",
  red_background: "#F9E8E7",

  green_button: "#23913C",
  green_background: "#E6F7E4",

  // Font Size
  font8: { fontSize: 8, letterSpacing: -0.2 },
  font8_medium: { fontSize: 8, letterSpacing: -0.2, fontWeight: 500 },
  font10: { fontSize: 10 },
  font12: { fontSize: 12, letterSpacing: 0.4 },
  font14: { fontSize: 14, lineHeight: "16px" },
  font14_bold: { fontSize: 14, fontWeight: 700, lineHeight: "16px" },
  font16: { fontSize: 16, letterSpacing: -0.4 },
  font16_bold: { fontSize: 16, letterSpacing: -0.4, fontWeight: 700 },
  font18: { fontSize: 18, letterSpacing: -0.6 },
  font20: { fontSize: 20, letterSpacing: -0.75 },

  // Shadow

  // White Container or Button
  shadow:
    "0px 1.5px 1px -0.5px rgba(110, 54, 120, 0.05), " +
    "0px 2.5px 1px -0.5px rgba(110, 54, 120, 0.03), " +
    "0px 2px 3px -1px rgba(110, 54, 120, 0.11)",
  shadow_3:
    "0px 3px 4px -2px rgba(110, 54, 120, 0.04)," +
    " 0px 3px 3px -2px rgba(110, 54, 120, 0.02)," +
    " 0px 3px 8px -2px rgba(110, 54, 120, 0.1)",
  shadow_3_up:
    "0px -3px 4px -2px rgba(110, 54, 120, 0.04)," +
    " 0px -3px 3px -2px rgba(110, 54, 120, 0.02)," +
    " 0px -3px 8px -2px rgba(110, 54, 120, 0.1)",
  // Inset Button
  shadow_purple_button_inset: "inset 2px 2px 5px -2px rgba(0, 0, 0, 0.15)",
  shadow_gray_button_inset: "inset 2px 2px 5px -2px rgba(0, 0, 0, 0.075)",
  // Input or DatePicker
  shadow_purple_input_inset: "inset 1px 1px 2.5px -1px rgba(110, 54, 120, 0.1)",
  shadow_gray_input_inset: " inset 1px 1px 2.5px -1px rgba(0, 0, 0, 0.075)",
  shadow_clicked:
    "0px 2px 4px rgba(110, 54, 120, 0.2), " +
    "0px 1px 18px rgba(110, 54, 120, 0.12), " +
    "0px 6px 10px rgba(110, 54, 120, 0.14)",

  // Transition
  duration: "0.15s",

  // White Container Width
  container_max_width: 325,

  // Cursor
  cursor: (disabled: boolean) => {
    return disabled ? "not-allowed" : "pointer";
  },
};
