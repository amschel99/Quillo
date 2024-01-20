import { JSX } from "react";
import { SearchIcon } from "../../assets/icons";
import "../../styles/components/home/search.scss";

export const Search = (): JSX.Element => {
  return (
    <div className="search">
      <input placeholder="Search companies..." type="text" name="search" />

      <SearchIcon />
    </div>
  );
};
