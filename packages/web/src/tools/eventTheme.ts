import { blue } from "@mui/material/colors";
import shadows from "@mui/material/styles/shadows";

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
  gold_leaderboard: "linear-gradient(180deg, #FFEB3B 0%, #FF9800 100%)",
  silver_leaderboard: "linear-gradient(180deg, #D6DEE1 0%, #586D75 100%)",
  copper_leaderboard: "linear-gradient(180deg, #FFAD94 0%, #954B2C 100%)",
  blue_leaderboard: "linear-gradient(180deg, #00B2FF 0%, #5E35B1 100%)",
  blue_button: "linear-gradient(180deg, #00B2FF 0%, #0401B4 100%)",
  purple_button: "linear-gradient(180deg, #F111DA 0%, #5E35B1 100%)",
  orange_button: "linear-gradient(180deg, #FFC700 0%, #C50A0A 100%)",
  blue_title: "linear-gradient(180deg, #00B2FF 0%, #5E35B1 100%)",
  blue_icon_top: "#00B2FF",
  blue_icon_bottom: "#5E35B1",
  yellow: "#F2A024",

  // Border radius
  borderRadius: "12px",

  // Font Size
  font10: {
    fontFamily: "Galmuri11",
    fontSize: 10,
    fontWeight: 400,
    lineHeight: "12px",
  },
  font12: {
    fontFamily: "Galmuri11",
    fontSize: 12,
    letterSpacing: -0.4,
    fontWeight: 400,
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
  shadow_leaderboard:
    "0px 1.5px 1px -0.5px rgba(110, 54, 120, 0.05), " +
    "0px 2.5px 1px -0.5px rgba(110, 54, 120, 0.03), " +
    "0px 2px 3px -1px rgba(110, 54, 120, 0.11)",
};

export default eventTheme;
