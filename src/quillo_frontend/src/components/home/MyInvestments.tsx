import { JSX } from "react";
import { ArrowIcon } from "../../assets/icons";
import "../../styles/components/home/investments.scss";

interface investmentprops {
  setshowinvestment: (show: boolean) => void;
}

export const MyInvestments = ({
  setshowinvestment,
}: investmentprops): JSX.Element => {
  return (
    <div id="investment_list">
      <div className="investment">
        <div>
          <p className="companyname">Equinshares</p>

          <p>100K shares</p>

          <p>2 ICP - 10 shares</p>
        </div>

        <span onClick={() => setshowinvestment(true)} className="arrow">
          <ArrowIcon />
        </span>
      </div>
    </div>
  );
};
