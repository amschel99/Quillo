import React, { JSX } from "react";
import { AwesomeIcon, CancelIcon } from "../../assets/icons";
import "../../styles/components/global/investmentdetail.scss";

interface invdetails {
  setshowinvestment: (show: boolean) => void;
}

export const Investmentdetail = ({
  setshowinvestment,
}: invdetails): JSX.Element => {
  return (
    <div id="blurctr">
      <div id="investmentdetails">
        <div className="company_name">
          <p>My Equinshares Investment</p>
        </div>

        <div className="inv">
          <p className="tle">My investment</p>
          <p>300 ICP(s) - 10000 Shares</p>
        </div>

        <div className="inv">
          <p className="tle">Investment made on</p>
          <p>23rd Dec 2023 - 2 months ago</p>
        </div>

        <div className="inv">
          <p className="tle">My earned dividends</p>
          <p>23rd Dec 2023 - about 2 months ago</p>
        </div>

        <div className="inv">
          <p className="tle">Dividends maturity</p>
          <p>23rd Dec 2023 - in about 2 months ago</p>
        </div>

        <div className="buttons">
          <button onClick={() => setshowinvestment(false)} className="cancel">
            <span>Cancel</span>
            <CancelIcon />
          </button>

          <button className="acquire">
            <span>Collect dividends</span>
            <AwesomeIcon />
          </button>
        </div>
      </div>
    </div>
  );
};
