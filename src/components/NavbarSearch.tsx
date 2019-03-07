import React, { useState } from "react";

interface Props {
  onFocus: () => void;
  onBlur: () => void;
  onSubmit: (value: string) => void;
}

export function NavbarSearch(props: Props) {
  const [value, setValue] = useState("");
  const { onFocus, onBlur, onSubmit } = props;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(value);
  };

  const handleReset = (e: React.FormEvent) => {
    setValue("");
  };

  return (
    <div className="navbar-search">
      <form
        className="navbar-search-form"
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
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
            value={value}
            onChange={e => setValue(e.target.value)}
            onFocus={() => onFocus()}
            onBlur={() => onBlur()}
          />
          <button className="btn btn-reset" type="reset">
            <i className="icon-reset">&times;</i>
          </button>
        </div>
        <button className="btn btn-search" type="submit">
          <i className="icon-search fa fa-search" />
        </button>
      </form>
      {value && (
        <div className="navbar-search-popup">
          <div className="navbar-search-result">{value}</div>
        </div>
      )}
    </div>
  );
}
