import { JSX } from "react";
import {
  ArrowIcon,
  ParagraphIcon,
  PublicIcon,
  UploadIcon,
} from "../../assets/icons";
import "../../styles/components/auth/profile.scss";

export const CompanyProfile = (): JSX.Element => {
  return (
    <div className="companyprofile">
      <span className="top">
        <p className="title">Create your company profile</p>
        <div className="divider" />
      </span>

      <input
        type="text"
        className="companyname"
        placeholder="Company name"
        max={128}
      />

      <span id="companydescription">
        <span>
          <p className="title">Company description</p>

          <ParagraphIcon />
        </span>

        <textarea name="description" />
      </span>

      <p className="title">Documents</p>
      <div className="files">
        <label htmlFor="legal-doc">
          <p className="title">Legal information</p>
          <input id="legal-doc" name="legal-doc" type="file" hidden></input>
          <UploadIcon />
        </label>

        <label htmlFor="bsn-doc">
          <p className="title">Business information</p>
          <input id="bsn-doc" name="bsn-doc" hidden type="file"></input>
          <UploadIcon />
        </label>
      </div>

      <p className="title">Share distribution</p>
      <div className="shares">
        <div>
          <span>
            <p className="title">Company public shares</p>
            <PublicIcon />
          </span>

          <input placeholder="1000000" type="number" maxLength={12} />
        </div>

        <div>
          <span>
            <p className="title">Value per share</p>
            <PublicIcon />
          </span>

          <input placeholder="1000000" type="number" maxLength={12} />
        </div>
      </div>

      <button className="submit">
        <p>Get started</p>
        <ArrowIcon />
      </button>
    </div>
  );
};
