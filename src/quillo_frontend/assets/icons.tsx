import { JSX } from "react";
import Svg, { Path } from "react-native-svg";

interface iconProps {
  iconWidth?: number;
  iconHeight?: number;
  iconColor?: string;
}

export const ArrowLeftIcon = ({
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
        d="M5.62698 11L6.57273 10.0756L2.5603 6.15364L20 6.15364V4.84624L2.56043 4.84624L6.57273 0.92442L5.62698 -9.53674e-07L0 5.5L5.62698 11Z"
        fill={iconColor ?? "#7F7F7F"}
      />
    </Svg>
  );
};

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

export const UploadIcon = ({
  iconWidth,
  iconHeight,
  iconColor,
}: iconProps): JSX.Element => {
  return (
    <Svg
      width={iconWidth ?? 14}
      height={iconHeight ?? 16}
      viewBox="0 0 16 18"
      fill="none"
    >
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 16.875C0 16.5766 0.120408 16.2905 0.334735 16.0795C0.549062 15.8685 0.839753 15.75 1.14286 15.75H14.8571C15.1602 15.75 15.4509 15.8685 15.6653 16.0795C15.8796 16.2905 16 16.5766 16 16.875C16 17.1734 15.8796 17.4595 15.6653 17.6705C15.4509 17.8815 15.1602 18 14.8571 18H1.14286C0.839753 18 0.549062 17.8815 0.334735 17.6705C0.120408 17.4595 0 17.1734 0 16.875ZM3.76343 5.29521C3.54918 5.08423 3.42882 4.79813 3.42882 4.49982C3.42882 4.20151 3.54918 3.91541 3.76343 3.70443L7.192 0.329389C7.40632 0.118481 7.69696 0 8 0C8.30305 0 8.59368 0.118481 8.808 0.329389L12.2366 3.70443C12.4448 3.91661 12.5599 4.2008 12.5573 4.49577C12.5547 4.79075 12.4345 5.07291 12.2227 5.2815C12.0108 5.49009 11.7241 5.6084 11.4245 5.61097C11.1248 5.61353 10.8361 5.50014 10.6206 5.29521L9.14286 3.84056V12.3749C9.14286 12.6733 9.02245 12.9594 8.80812 13.1704C8.59379 13.3814 8.30311 13.4999 8 13.4999C7.6969 13.4999 7.40621 13.3814 7.19188 13.1704C6.97755 12.9594 6.85714 12.6733 6.85714 12.3749V3.84056L5.37943 5.29521C5.16511 5.50611 4.87447 5.62459 4.57143 5.62459C4.26838 5.62459 3.97775 5.50611 3.76343 5.29521Z"
        fill={iconColor ?? "#7F7F7F"}
      />
    </Svg>
  );
};

export const CheckIcon = ({
  iconWidth,
  iconHeight,
}: iconProps): JSX.Element => {
  return (
    <Svg
      width={iconWidth ?? 20}
      height={iconHeight ?? 20}
      viewBox="0 0 22 22"
      fill="none"
    >
      <Path
        d="M7.5 11.5L9.5 13.5L14.5 8.50002"
        stroke="#86E40E"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M6 2.33801C7.51952 1.45891 9.24451 0.997307 11 1.00001C16.523 1.00001 21 5.47701 21 11C21 16.523 16.523 21 11 21C5.477 21 1 16.523 1 11C1 9.17901 1.487 7.47001 2.338 6.00001"
        stroke="#86E40E"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </Svg>
  );
};
