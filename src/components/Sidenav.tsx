import React from "react";

import { INavEntry } from "../interfaces";
import Nav from "./Nav";

interface SidenavProps {
  navItems: INavEntry[];
}

interface SidenavState {}

class Sidenav extends React.Component<SidenavProps, SidenavState> {
  render() {
    return (
      <aside className="sidenav">
        <div className="sidenav__container">
          <nav>
            <Nav items={this.props.navItems} />
          </nav>
        </div>
      </aside>
    );
  }
}

export default Sidenav;
