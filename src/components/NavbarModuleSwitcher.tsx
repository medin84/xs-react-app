import React from "react";

import config from "../config";
import { INavEntry } from "../interfaces";
import { ModuleLinks } from "./ModuleLinks";
import { Dropdown, DropdownToggle, DropdownMenu } from "./dropdown";

const ws: INavEntry = {
  id: config.URL_WS,
  caption: "Workspace",
  icon: "",
  url: "",
  defaultUrl: config.URL_WS
};

interface Props {
  modules: INavEntry[];
}

export function NavbarModuleSwitcher(props: Props) {
  return (
    <Dropdown className="nav-item nav-ws-apps">
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
