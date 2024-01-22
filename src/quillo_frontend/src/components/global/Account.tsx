import React, { JSX } from "react";
import { LogoutIcon } from "../../assets/icons";
import "../../styles/components/global/account.scss";

export const Account = (): JSX.Element => {
  return (
    <div id="account">
      <p>100 ICP・wTq****kL</p>

      <button>
        <span>Log Out</span>
        <LogoutIcon />
      </button>
    </div>
  );
};
