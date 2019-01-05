import React from "react";

import { IApplicationState } from "../interfaces";
import NavbarUserMenu from "./NavbarUserMenu";

interface NavbarProps extends IApplicationState {
  onSidenavToggle: () => void;
  onLogout: () => void;
}

class Navbar extends React.Component<NavbarProps> {
  render() {
    const { title, orgName, logo, sidenav } = this.props.ui;
    const { onSidenavToggle, onLogout } = this.props;

    return (
      <React.Fragment>
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
            <NavbarUserMenu user={this.props.user} onLogout={onLogout} />
          </div>
        </header>
        <div className="navbar__spacer" />
      </React.Fragment>
    );
  }
}

export default Navbar;
