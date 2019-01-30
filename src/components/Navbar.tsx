import React from "react";
import { RouteComponentProps, Link } from "react-router-dom";

import { IApplicationState } from "../interfaces";
import NavbarUserMenu from "./NavbarUserMenu";
import ModuleList from "./ModuleList";

interface NavbarProps extends IApplicationState, RouteComponentProps {
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
            <div className="dropdown to-left nav-item nav-ws-apps">
              <div className="dropdown-toggle nav-ws-apps__toggle no-arrow">
                <i className="fa fa-th" />
              </div>
              <div className="dropdown-menu nav-ws-apps__menu">
                <Link
                  to={{ pathname: `/ws` }}
                  className="module-link ws-app-link nav-ws-apps__menu_item"
                >
                  Workspace
                </Link>
                <ModuleList
                  itemClassName="nav-ws-apps__menu_item"
                  modules={sidenav.items}
                />
              </div>
            </div>
            <NavbarUserMenu {...this.props} onLogout={onLogout} />
          </div>
        </header>
        <div className="navbar__spacer" />
      </React.Fragment>
    );
  }
}

export default Navbar;
