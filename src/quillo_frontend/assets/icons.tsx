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

export const LetterQicon = ({
  iconColor,
  iconWidth,
  iconHeight,
}: iconProps): JSX.Element => {
  return (
    <Svg
      width={iconWidth ?? 24}
      height={iconHeight ?? 27}
      viewBox="0 0 24 27"
      fill="none"
    >
      <Path
        d="M16.984 26.84L14.104 22.968C13.2507 23.1387 12.4187 23.224 11.608 23.224C9.496 23.224 7.55467 22.7333 5.784 21.752C4.03467 20.7707 2.63733 19.4053 1.592 17.656C0.568 15.8853 0.056 13.9013 0.056 11.704C0.056 9.50667 0.568 7.53333 1.592 5.784C2.63733 4.03467 4.03467 2.66933 5.784 1.688C7.55467 0.706666 9.496 0.216 11.608 0.216C13.72 0.216 15.6507 0.706666 17.4 1.688C19.1707 2.66933 20.5573 4.03467 21.56 5.784C22.584 7.53333 23.096 9.50667 23.096 11.704C23.096 13.624 22.7013 15.384 21.912 16.984C21.144 18.5627 20.0667 19.8747 18.68 20.92L23.608 26.84H16.984ZM5.656 11.704C5.656 13.688 6.18933 15.2773 7.256 16.472C8.344 17.6453 9.79467 18.232 11.608 18.232C13.4 18.232 14.8293 17.6347 15.896 16.44C16.984 15.2453 17.528 13.6667 17.528 11.704C17.528 9.72 16.984 8.14133 15.896 6.968C14.8293 5.77333 13.4 5.176 11.608 5.176C9.79467 5.176 8.344 5.76267 7.256 6.936C6.18933 8.10933 5.656 9.69867 5.656 11.704Z"
        fill={iconColor ?? "white"}
      />
    </Svg>
  );
};
