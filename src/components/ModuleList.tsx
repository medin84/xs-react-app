import React from "react";
import { NavLink } from "react-router-dom";

import { INavEntry } from "../interfaces";

interface ModuleListProps {
  itemClassName: string;
  modules: INavEntry[];
}

class ModuleList extends React.Component<ModuleListProps> {
  render() {
    const { modules, itemClassName } = this.props;
    if (!modules) {
      return null;
    }

    return (
      <ul className="module-list list-style-none">
        {modules.map(module => {
          return (
            <li className={itemClassName} key={module.id}>
              <NavLink
                to={{ pathname: `/bd/${module.id}` }}
                activeClassName="-active"
                className="module-link ws-app-link"
              >
                <span className="module-logo-wrap ws-app-logo">
                  {/* <img
                    className="module-logo"
                    src={module.caption}
                    alt={module.caption}
                  /> */}
                </span>
                <span className="module-type ws-app-type">
                  {/* {module.caption} */}
                </span>
                <span className="module-name ws-app-name">
                  {module.caption}
                </span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default ModuleList;
