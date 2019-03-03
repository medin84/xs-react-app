import React from "react";

import { IApplicationState } from "../interfaces";
import { NavbarUserMenu } from "./NavbarUserMenu";
import { NavbarModuleSwitcher } from "./NavbarModuleSwitcher";

interface NavbarProps extends IApplicationState {
  onSidenavToggle: () => void;
  onLogout: () => void;
}

export function Navbar(props: NavbarProps) {
  const {
    ui: { title, orgName, logo, navbarModuleSwitcherVisible, sidenav },
    onSidenavToggle,
    onLogout
  } = props;

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
          {navbarModuleSwitcherVisible && (
            <NavbarModuleSwitcher modules={sidenav.items} />
          )}
          <NavbarUserMenu {...props} onLogout={onLogout} />
        </div>
      </header>
      <div className="navbar__spacer" />
    </>
  );
}
