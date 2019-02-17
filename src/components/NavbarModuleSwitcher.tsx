import React from "react";
import { Link } from "react-router-dom";

import { URL_WS } from "../constants/UrlConstants";
import { INavEntry } from "../interfaces";
import ModuleList from "./ModuleList";

interface NavbarModuleSwitcherProps {
  modules: INavEntry[];
}

class NavbarModuleSwitcher extends React.Component<NavbarModuleSwitcherProps> {
  render() {
    const { modules } = this.props;

    return (
      <div className="dropdown to-left nav-item nav-ws-apps">
        <div className="dropdown-toggle nav-ws-apps__toggle no-arrow">
          <i className="fa fa-th" />
        </div>
        <div className="dropdown-menu nav-ws-apps__menu">
          <Link
            to={{ pathname: URL_WS }}
            className="module-link ws-app-link nav-ws-apps__menu_item"
          >
            Workspace
          </Link>
          <ModuleList
            itemClassName="nav-ws-apps__menu_item"
            modules={modules}
          />
        </div>
      </div>
    );
  }
}

export default NavbarModuleSwitcher;
