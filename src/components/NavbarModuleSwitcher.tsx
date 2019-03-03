import React from "react";

import { URL_WS } from "../constants";
import { INavEntry } from "../interfaces";
import { ModuleLinks } from "./ModuleLinks";

const ws: INavEntry = {
  id: URL_WS,
  caption: "Workspace",
  icon: "",
  url: ""
};

interface NavbarModuleSwitcherProps {
  modules: INavEntry[];
}

export function NavbarModuleSwitcher(props: NavbarModuleSwitcherProps) {
  return (
    <div className="dropdown to-left nav-item nav-ws-apps">
      <div className="dropdown-toggle nav-ws-apps__toggle no-arrow">
        <i className="fa fa-th" />
      </div>
      <div className="dropdown-menu nav-ws-apps__menu">
        <ModuleLinks modules={[ws]} />
        <ModuleLinks modules={props.modules} />
      </div>
    </div>
  );
}
