import React from "react";

import { INavEntry } from "../interfaces";
import { ModuleLink } from "./ModuleLink";

interface ModuleListProps {
  style?: "LIST" | "GRID";
  modules: INavEntry[];
}

export function ModuleLinks(props: ModuleListProps) {
  const className =
    props.style === "GRID" ? "ws-app" : "nav-ws-apps__menu_item";

  return (
    <ul className="module-list list-style-none">
      {props.modules.map(module => (
        <li className={className} key={module.id}>
          <ModuleLink {...module} />
        </li>
      ))}
    </ul>
  );
}
