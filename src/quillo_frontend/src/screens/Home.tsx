import React, { JSX, useState } from "react";
import { Search } from "../components/home/Search";
import { CompaniesList } from "../components/home/CompaniesList";
import { MyInvestments } from "../components/home/MyInvestments";
import { InvestorsList } from "../components/home/InvestorsList";
import { CompanyAccount } from "../components/home/CompanyAccount";
import { Account } from "../components/global/Account";
import { AboutCompany } from "../components/global/AboutCompany";
import { Investmentdetail } from "../components/global/InvestmentDetail";
import "../styles/screens/home.scss";

export default function Home(): JSX.Element {
  const [companydata, setcompanydata] = useState<{} | any>({});
  const [showcompany, setshowcompany] = useState<boolean>(false);
  const [showinvestment, setshowinvestment] = useState<boolean>(false);

  const acctype: any = localStorage.getItem("acctype");
  const currentURL = window.location.href;

  const urlParts: string[] = currentURL.split("/");

  const homeIndex: number = urlParts.indexOf("home");

  const paramValue: string = String(urlParts[homeIndex + 1]);

  return (
    <section className="main">
      <div className="left_sect">
        {acctype && acctype == "bns" ? (
          <>
            <p className="invs_titles">{companydata?.companyName} Investors</p>
            <InvestorsList />
          </>
        ) : (
          <>
            <Search />
            <p className="title">All Companies</p>
            <CompaniesList setshowcompany={setshowcompany} />
          </>
        )}
      </div>

      <div className="right_sect">
        {acctype && acctype == "bns" ? (
          <>
            <CompanyAccount
              companyName={companydata?.companyName}
              companyDescription={companydata?.description}
              availableshares={Number(companydata?.publicShares)}
              valuepershare={Number(companydata?.valuePerShare)}
              initalsharecount={10000}
            />
          </>
        ) : (
          <>
            <p className="investments_title">My Investments</p>
            <MyInvestments setshowinvestment={setshowinvestment} />
          </>
        )}
      </div>

      {showcompany && <AboutCompany setshowcompany={setshowcompany} />}

      {showinvestment && (
        <Investmentdetail setshowinvestment={setshowinvestment} />
      )}
      <Account />
    </section>
  );
}
