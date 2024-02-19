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
  home_button: "linear-gradient(180deg, #00B2FF 0%, #5E35B1 100%)",
  instagram_button: "linear-gradient(180deg, #FC01C5 0%, #FFC800 100%)",
  nubzuki_eyes: "linear-gradient(180deg, #00B2FF 0%, #000 100%)",
  ai_img:
    "linear-gradient(180deg, #000 0%, #E6D198 20.31%, #E9D3A1 79.7%, #000 100%)",
  radial_coin:
    "radial-gradient(50% 50% at 50% 50%, #00B2FF 0%, #5E35B1 78%, #000 100%)",
  blue_icon_top: "#00B2FF",
  blue_icon_bottom: "#5E35B1",
  yellow: "#F2A024",
  kaist: "#004193",

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
  
  //shadow
  shadow_leaderboard:
    "0px 1.5px 1px -0.5px rgba(110, 54, 120, 0.05), " +
    "0px 2.5px 1px -0.5px rgba(110, 54, 120, 0.03), " +
    "0px 2px 3px -1px rgba(110, 54, 120, 0.11)",
};

export default eventTheme;
