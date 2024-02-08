import { JSX } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent } from "@dfinity/agent";
import { useAnimation } from "./context/animationctx";
import { Animations } from "./components/Animations";
import Logo from "./assets/images/icon.png";
import "./assets/styles/app.scss";

export default function App(): JSX.Element {
  const { renderanimation, showAnimation } = useAnimation();

  const onSignIn = async (): Promise<void> => {
    showAnimation("loading", "Hold on...");

    let authClient = await AuthClient.create();

    await new Promise(() => {
      authClient.login({
        identityProvider: "https://identity.ic0.app",
        onSuccess() {
          showAnimation("success", "You signed in successfully");
        },
        onError(error) {
          showAnimation("errror", "An error occurred, try again...");
          console.log(error);
        },
      });
    });

    const identity = await authClient.getIdentity();
    const agent = new HttpAgent({ identity });

    console.log(agent);
  };

  return (
    <>
      <div className="main">
        <img className="logo" src={Logo} alt="Quillo" />

        <button className="signinbtn" onClick={onSignIn}>
          Sign In
        </button>
      </div>

      {renderanimation && <Animations />}
    </>
  );
}
