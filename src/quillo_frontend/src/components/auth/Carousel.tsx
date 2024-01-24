import React, { JSX } from "react";

interface carouselProps {
  dptext: string;
  icon: JSX.Element;
}

export const Carousel = ({ dptext, icon }: carouselProps): JSX.Element => {
  return (
    <div className="carousel_">
      <p>{dptext}</p>

      <div className="carousel_icon">{icon}</div>
    </div>
  );
};
