import React, { JSX } from "react";
import Svg, { Path } from "react-native-svg";

interface iconProps {
  iconWidth?: number;
  iconHeight?: number;
  iconColor?: string;
}

export const ArrowRightIcon = ({
  iconWidth,
  iconHeight,
  iconColor,
}: iconProps): JSX.Element => {
  return (
    <Svg
      width={iconWidth ?? 20}
      height={iconHeight ?? 11}
      viewBox="0 0 20 11"
      fill="none"
    >
      <Path
        d="M14.373 0L13.4273 0.924422L17.4397 4.84636H0V6.15376H17.4396L13.4273 10.0756L14.373 11L20 5.5L14.373 0Z"
        fill={iconColor ?? "white"}
      />
    </Svg>
  );
};

export const SearchIcon = ({
  iconWidth,
  iconHeight,
}: iconProps): JSX.Element => {
  return (
    <Svg
      width={iconWidth ?? 22}
      height={iconHeight ?? 22}
      viewBox="0 0 22 22"
      fill="none"
    >
      <Path
        d="M21 21L16.2779 16.2695M18.8947 9.94737C18.8947 12.3204 17.9521 14.5962 16.2741 16.2741C14.5962 17.9521 12.3204 18.8947 9.94737 18.8947C7.57438 18.8947 5.29858 17.9521 3.62062 16.2741C1.94267 14.5962 1 12.3204 1 9.94737C1 7.57438 1.94267 5.29858 3.62062 3.62062C5.29858 1.94267 7.57438 1 9.94737 1C12.3204 1 14.5962 1.94267 16.2741 3.62062C17.9521 5.29858 18.8947 7.57438 18.8947 9.94737Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
      />
    </Svg>
  );
};
