import { JSX } from "react";
import { TransparentIcon } from "../../assets/icons";

interface carouselProps {
  dptext: string;
  icon: JSX.Element;
}

export const Carousel = ({ dptext, icon }: carouselProps): JSX.Element => {
  return (
    <div className="carousel_">
      <p>{dptext}</p>

      {icon}
    </div>
  );
};
