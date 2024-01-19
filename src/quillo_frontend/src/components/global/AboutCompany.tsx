import React, { JSX } from "react";
import {
  AwesomeIcon,
  CancelIcon,
  PublicIcon,
  SlantArrowIcon,
} from "../../../assets/icons";
import "../../styles/components/global/aboutcompany.scss";

interface aboutProps {
  setshowcompany: (show: boolean) => void;
}

export const AboutCompany = ({ setshowcompany }: aboutProps): JSX.Element => {
  return (
    <div id="aboutcompany">
      <div className="company_name">
        <p>About Equinshares</p>
      </div>

      <div className="reg_name">
        <p className="plchlder_">Trademark Name</p>
        <p className="ttle_">Equinshares</p>
      </div>

      <div className="reg_name">
        <p className="plchlder_">About</p>
        <p className="ttle_">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio, amet
          impedit ad cum quo eos quibusdam ullam. Ab odit tempora laboriosam
          vitae, ipsum quod ipsa impedit quisquam nesciunt similique esse
          doloribus.
        </p>
      </div>

      <div className="shares">
        <p className="plchlder_">Share distribution</p>

        <span className="av_shares">
          <div className="sh_class">
            <div>
              <span>Available shares</span>
              <PublicIcon />
            </div>

            <p>60000</p>
          </div>

          <div className="sh_class">
            <div>
              <span>Value per share (usd)</span>
              <PublicIcon />
            </div>

            <p>120</p>
          </div>
        </span>
      </div>

      <div className="reg_name docs">
        <p className="plchlder_">Documents</p>

        <div>
          <span>
            <span className="plchlder_">Preview Legal documents</span>
            <SlantArrowIcon />
          </span>

          <span>
            <span className="plchlder_">Preview business documents</span>
            <SlantArrowIcon />
          </span>
        </div>
      </div>

      <div className="buttons">
        <button onClick={() => setshowcompany(false)} className="cancel">
          <span>Cancel</span>
          <CancelIcon />
        </button>

        <button className="acquire">
          <span>Get Equinshare shares</span>
          <AwesomeIcon />
        </button>
      </div>
    </div>
  );
};
