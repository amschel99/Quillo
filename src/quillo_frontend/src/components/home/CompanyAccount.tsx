import React, { JSX } from "react";
import {
  ArrowIcon,
  CheckIcon,
  PublicIcon,
  RefreshIcon,
} from "../../../assets/icons";
import "../../styles/components/home/companyaccount.scss";

interface companyAccProps {
  companyName: string;
  companyDescription: string;
  availableshares: number;
  valuepershare: number;
  initalsharecount: number;
}

export const CompanyAccount = ({
  companyName,
  companyDescription,
  availableshares,
  valuepershare,
  initalsharecount,
}: companyAccProps): JSX.Element => {
  return (
    <div className="companyaccount">
      <p className="titles">My business profile</p>

      <p className="fainttitle lgmargin">Name</p>

      <p className="titles smmargin">{companyName}</p>

      <p className="fainttitle lgmargin">Description</p>

      <p className="titles smmargin">{companyDescription}</p>

      <p className="fainttitle lgmargin">My documents</p>

      <div className="buttons">
        <div className="button">
          <span>Business Information</span>
          <CheckIcon />
          <div className="divider" />
          <RefreshIcon />
        </div>

        <div className="button">
          <span>Legal Information</span>
          <CheckIcon />
          <div className="divider" />
          <RefreshIcon />
        </div>
      </div>

      <p className="fainttitle smmargin">My share distribution</p>

      <div className="av_shares">
        <div className="sh_class">
          <div>
            <span>Available shares</span>
            <PublicIcon />
          </div>

          <p>{availableshares}</p>
        </div>

        <div className="sh_class">
          <div>
            <span>Available shares</span>
            <PublicIcon />
          </div>

          <p>{valuepershare}</p>
        </div>

        <div className="init">
          <p>Initial share count</p>
          <p>{initalsharecount}</p>
        </div>
      </div>

      <div className="website">
        <input
          placeholder="My Company Website URL"
          type="text"
          name="website_url"
          id="web_url"
        />

        <div className="savebtn">
          <span>Save</span>
          <ArrowIcon />
        </div>
      </div>
    </div>
  );
};
