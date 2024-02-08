import { JSX, createContext, useContext, useState, ReactNode } from "react";

type animationtype = "" | "loading" | "success" | "errror";

type animationctxtype = {
  typeofanimation: animationtype;
  animationmessage: string;
  renderanimation: boolean;
  showAnimation: (
    animationtype: animationtype,
    animationmessage: string
  ) => void;
  hideAnimation: () => void;
};

const animationcontext = createContext<animationctxtype>(
  {} as animationctxtype
);

interface providerProps {
  children: ReactNode;
}

export const AnimationProvider = ({ children }: providerProps): JSX.Element => {
  const [renderanimation, setrenderanimation] = useState<boolean>(false);
  const [typeofanimation, settypeofanimation] = useState<animationtype>("");
  const [animationmessage, setanimationmessage] = useState<string>("");

  const showAnimation = (
    typeofanimation: animationtype,
    animationmessage: string
  ): void => {
    setrenderanimation(true);
    settypeofanimation(typeofanimation);
    setanimationmessage(animationmessage);
  };

  const hideAnimation = (): void => {
    setrenderanimation(false);
    settypeofanimation("");
  };

  return (
    <animationcontext.Provider
      value={{
        renderanimation,
        typeofanimation,
        animationmessage,
        showAnimation,
        hideAnimation,
      }}
    >
      {children}
    </animationcontext.Provider>
  );
};

export const useAnimation = (): animationctxtype =>
  useContext<animationctxtype>(animationcontext);
