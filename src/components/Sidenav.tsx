import React from "react";

import { INavEntry } from "../interfaces";
import Nav from "./Nav";

interface SidenavProps {
  title?: string;
  dbid: string;
  navItems: INavEntry[];
  expanded: string[];
  toggleCollapsible: (entry: INavEntry) => void;
}

class Sidenav extends React.Component<SidenavProps> {
  render() {
    const { title, dbid, navItems, expanded, toggleCollapsible } = this.props;

    return (
      <aside className="sidenav">
        <div className="sidenav__container">
          <nav>
            {title && <h5 className="sidenav__nav_title">{title}</h5>}
            <Nav
              dbid={dbid}
              items={navItems}
              expanded={expanded}
              toggleCollapsible={toggleCollapsible}
            />
          </nav>
        </div>
      </aside>
    );
  }
}

export default Sidenav;
