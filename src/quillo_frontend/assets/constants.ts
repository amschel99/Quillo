import { Dimensions } from "react-native";

export enum colors {
  primary = "#00000F",
  secondary = "rgba(248, 250, 252, 0.1)",
  text_primary = "#FFFFFF",
  text_secondary = "#7F7F7F",
  divider = "rgba(248, 250, 252, 0.1)",
  divider_faint = "rgba(248, 250, 252, 0.03)",
}

export const screenstyle: {
  flex: number;
  padding: number;
  paddingHorizontal: number;
  backgroundColor: string;
} = {
  flex: 1,
  padding: 8,
  paddingHorizontal: 14,
  backgroundColor: colors.primary,
};

export const textlight: {
  fontSize: number;
  fontFamily: string;
  color: string;
} = {
  fontSize: 14,
  fontFamily: "ops-light",
  color: colors.text_primary,
};

export const textlightfaint: {
  fontSize: number;
  fontFamily: string;
  color: string;
} = {
  ...textlight,
  color: colors.text_secondary,
};

export const textbold: {
  fontSize: number;
  fontFamily: string;
  color: string;
} = {
  fontSize: 16,
  fontFamily: "ops-regular",
  color: colors.text_primary,
};

export const { width: SCREENWIDTH, height: SCREENHEIGH } =
  Dimensions.get("window");
