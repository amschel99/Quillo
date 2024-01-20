import { JSX } from "react";
import { AwesomeIcon } from "../../assets/icons";
import "../../styles/components/home/myinvestors.scss";

export const InvestorsList = (): JSX.Element => {
  return (
    <div className="investorsList">
      <div className="investor">
        <span style={{ marginBottom: "0.5rem" }}>
          <p>wT****kL</p>
          <AwesomeIcon />
        </span>

        <span>
          <p className="xrate">200 IPC - 10K shares</p>
          <p>10 days ago</p>
        </span>
      </div>
    </div>
  );
};
