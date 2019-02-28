import React from "react";

import { URL_WS } from "../constants/UrlConstants";
import { INavEntry } from "../interfaces";
import { ModuleLinks } from "./ModuleLinks";

interface NavbarModuleSwitcherProps {
  modules: INavEntry[];
}

class NavbarModuleSwitcher extends React.PureComponent<
  NavbarModuleSwitcherProps
> {
  render() {
    const { modules } = this.props;
    const ws: INavEntry = {
      id: URL_WS,
      caption: "Workspace",
      icon: "",
      url: URL_WS
    };

    return (
      <div className="dropdown to-left nav-item nav-ws-apps">
        <div className="dropdown-toggle nav-ws-apps__toggle no-arrow">
          <i className="fa fa-th" />
        </div>
        <div className="dropdown-menu nav-ws-apps__menu">
          <ModuleLinks modules={[ws]} />
          <ModuleLinks modules={modules} />
        </div>
      </div>
    );
  }
}

export default NavbarModuleSwitcher;
