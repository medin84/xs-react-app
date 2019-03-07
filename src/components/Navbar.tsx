import React from "react";

import { IApplicationState } from "../interfaces";
import { NavbarUserMenu } from "./NavbarUserMenu";
import { NavbarModuleSwitcher } from "./NavbarModuleSwitcher";
import { NavbarSearch } from "./NavbarSearch";

interface NavbarProps extends IApplicationState {
  onSidenavToggle: () => void;
  onSearchInputFocus: () => void;
  onSearchInputBlur: () => void;
  onSearchSubmit: (value: string) => void;
  onLogout: () => void;
}

export function Navbar(props: NavbarProps) {
  const {
    user,
    ui: { title, orgName, logo, navbarModuleSwitcherVisible, sidenav },
    onSidenavToggle,
    onSearchInputFocus,
    onSearchInputBlur,
    onSearchSubmit,
    onLogout
  } = props;

  const i18n = {
    your_profile: "Profile",
    logout: "Logout"
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar__container container">
          <div className="navbar-brand">
            {sidenav.gamburger && (
              <button
                className="btn-sidenav__toggle"
                type="button"
                onClick={onSidenavToggle}
              />
            )}
            {logo && <img className="brand-logo" src={logo} />}
            {(title || orgName) && (
              <div className="brand-title">
                {title}
                <span className="brand-sub-title">{orgName}</span>
              </div>
            )}
          </div>
          <NavbarSearch
            onFocus={onSearchInputFocus}
            onBlur={onSearchInputBlur}
            onSubmit={onSearchSubmit}
          />
          {navbarModuleSwitcherVisible && (
            <NavbarModuleSwitcher modules={sidenav.items} />
          )}
          <NavbarUserMenu user={user} i18n={i18n} onLogout={onLogout} />
        </div>
      </header>
      <div className="navbar__spacer" />
    </>
  );
}
