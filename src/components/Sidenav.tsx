import React from "react";

import { INavEntry } from "../interfaces";
import Nav from "./Nav";

interface SidenavProps {
  title?: string;
  path: string;
  navItems: INavEntry[];
}

class Sidenav extends React.Component<SidenavProps> {
  render() {
    const { title, navItems } = this.props;

    return (
      <aside className="sidenav">
        <div className="sidenav__container">
          <nav>
            {title && <h5 className="sidenav__nav_title">{title}</h5>}
            <Nav path={this.props.path} items={navItems} />
          </nav>
        </div>
      </aside>
    );
  }
}

export default Sidenav;
