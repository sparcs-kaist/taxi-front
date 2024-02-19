export type Font = {
  fontSize: number;
  letterSpacing?: number;
  fontWeight?: number;
  lineHeight?: string;
};

const eventTheme = {
  // Color
  white: "#FFFFFF",
  black: "#000000",
  blue_button: "linear-gradient(180deg, #00B2FF 0%, #0401B4 100%)",
  purple_button: "linear-gradient(180deg, #F111DA 0%, #5E35B1 100%)",
  orange_button: "linear-gradient(180deg, #FFC700 0%, #C50A0A 100%)",
  blue_title: "linear-gradient(180deg, #00B2FF 0%, #5E35B1 100%)",
  home_button: "linear-gradient(180deg, #00B2FF 0%, #5E35B1 100%)",
  instagram_button: "linear-gradient(180deg, #FC01C5 0%, #FFC800 100%)",
  blue_icon_top: "#00B2FF",
  blue_icon_bottom: "#5E35B1",
  yellow: "#F2A024",
  kaist: "#004193",

  // Border radius
  borderRadius: "12px",

  // Font Size
  font12: {
    fontFamily: "Galmuri11",
    fontWeight: 400,
    fontSize: 12,
    letterSpacing: "0.048px",
    lineHeight: "14px",
  },

  font16: {
    fontFamily: "Galmuri11",
    fontWeight: 400,
    fontSize: 16,
    letterSpacing: -0.4,
    lineHeight: "19px",
  },

  font16_bold: {
    fontFamily: "Galmuri11",
    fontSize: 16,
    letterSpacing: -0.4,
    fontWeight: 700,
    lineHeight: "19px",
  },

  font20: {
    fontFamily: "Galmuri11",
    fontSize: 20,
    letterSpacing: -0.75,
    fontWeight: 700,
    lineHeight: "23px",
  },

  font28: {
    fontFamily: "Galmuri11",
    fontSize: 28,
    letterSpacing: -1,
    fontWeight: 700,
    lineHeight: "33px",
  },
};

export default eventTheme;
