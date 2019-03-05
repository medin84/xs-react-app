import React from "react";

import { INavEntry } from "../interfaces";
import Nav from "./Nav";

interface SidenavProps {
  navItems: INavEntry[];
  expanded: string[];
  toggleCollapsible: (entry: INavEntry) => void;
}

export function Sidenav(props: SidenavProps) {
  const { navItems, expanded, toggleCollapsible } = props;

  return (
    <aside className="sidenav">
      <div className="sidenav__container">
        <nav>
          <Nav
            items={navItems}
            expanded={expanded}
            toggleCollapsible={toggleCollapsible}
          />
        </nav>
      </div>
    </aside>
  );
}
