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
  yellow: "#F2A024",

  // Border radius
  borderRadius: "12px",

  // Font Size
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
};

export default eventTheme;
