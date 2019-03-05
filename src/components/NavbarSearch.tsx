import React from "react";

interface Props {}

export function NavbarSearch(props: Props) {
  return (
    <div className="navbar-search">
      <form className="navbar-search-form">
        <button className="btn btn-close" type="button">
          <i className="icon-close">&times;</i>
        </button>
        <div className="search-input-box">
          <input
            type="search"
            className="q"
            name="keyword"
            required={true}
            autoComplete="off"
          />
          <button className="btn btn-reset" type="reset">
            <i className="icon-reset">&times;</i>
          </button>
        </div>
        <button className="btn btn-search" type="submit">
          <i className="icon-search fa fa-search" />
        </button>
      </form>
      {/* <div className="navbar-search-popup">
        <div className="navbar-search-result" />
      </div> */}
    </div>
  );
}
