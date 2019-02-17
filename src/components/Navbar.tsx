import React from "react";
import { RouteComponentProps } from "react-router-dom";

import { IApplicationState } from "../interfaces";
import NavbarUserMenu from "./NavbarUserMenu";
import NavbarModuleSwitcher from "./NavbarModuleSwitcher";

interface NavbarProps extends IApplicationState, RouteComponentProps {
  onSidenavToggle: () => void;
  onLogout: () => void;
}

class Navbar extends React.Component<NavbarProps> {
  render() {
    const {
      ui: { title, orgName, logo, sidenav },
      onSidenavToggle,
      onLogout
    } = this.props;

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
            {sidenav.gamburger && (
              <NavbarModuleSwitcher modules={sidenav.items} />
            )}
            <NavbarUserMenu {...this.props} onLogout={onLogout} />
          </div>
        </header>
        <div className="navbar__spacer" />
      </>
    );
  }
}

export default Navbar;
