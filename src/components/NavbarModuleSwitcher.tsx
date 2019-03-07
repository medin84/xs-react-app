import React from "react";

import { URL_WS } from "../constants";
import { INavEntry } from "../interfaces";
import { ModuleLinks } from "./ModuleLinks";
import { Dropdown, DropdownToggle, DropdownMenu } from "./dropdown";

const ws: INavEntry = {
  id: URL_WS,
  caption: "Workspace",
  icon: "",
  url: "",
  defaultUrl: URL_WS
};

interface NavbarModuleSwitcherProps {
  modules: INavEntry[];
}

export function NavbarModuleSwitcher(props: NavbarModuleSwitcherProps) {
  return (
    <Dropdown className="to-left nav-item nav-ws-apps">
      <DropdownToggle className="nav-ws-apps__toggle no-arrow">
        <i className="fa fa-th" />
      </DropdownToggle>
      <DropdownMenu className="nav-ws-apps__menu">
        <ModuleLinks modules={[ws]} />
        <ModuleLinks modules={props.modules} />
      </DropdownMenu>
    </Dropdown>
  );
}
