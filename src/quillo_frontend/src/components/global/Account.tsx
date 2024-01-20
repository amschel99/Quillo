import { JSX } from "react";
import { useNavigate } from "react-router-dom";
import { LogoutIcon } from "../../assets/icons";
import "../../styles/components/global/account.scss";

export const Account = (): JSX.Element => {
  const navigation = useNavigate();

  return (
    <div id="account">
      <p>100 IPC・wTq****kL</p>

      <button>
        <span>Log Out</span>
        <LogoutIcon />
      </button>
    </div>
  );
};
