import { JSX, useEffect } from "react";
import Lottie from "lottie-react";
import { useAnimation } from "../context/animationctx";
import loadinganimation from "../assets/animations/loading.json";
import succesanimation from "../assets/animations/success.json";
import erroanimation from "../assets/animations/error.json";
import "../assets/styles/components/animations.scss";

export const Animations = (): JSX.Element => {
  const { typeofanimation, animationmessage, hideAnimation, renderanimation } =
    useAnimation();

  useEffect(() => {
    setTimeout(() => {
      hideAnimation();
    }, 4500);
  }, [renderanimation]);

  return (
    <div className="animationctr">
      <span>{animationmessage}</span>

      {typeofanimation == "loading" && (
        <Lottie
          animationData={loadinganimation}
          autoPlay
          loop={true}
          className="animation"
        />
      )}

      {typeofanimation == "success" && (
        <Lottie
          animationData={succesanimation}
          autoPlay
          loop={false}
          className="animation"
        />
      )}

      {typeofanimation == "errror" && (
        <Lottie
          animationData={erroanimation}
          autoPlay
          loop={false}
          className="animation"
        />
      )}
    </div>
  );
};
