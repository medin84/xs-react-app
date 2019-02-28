import React from "react";
import { NavLink } from "react-router-dom";

import { INavEntry } from "../interfaces";

export function ModuleLink(module: INavEntry) {
  return (
    <NavLink
      to={module.id}
      activeClassName="-active"
      className="module-link ws-app-link"
    >
      <span className="module-logo-wrap ws-app-logo">
        {module.icon && (
          <img className="module-logo" src={module.icon} alt={module.caption} />
        )}
      </span>
      <div className="module-type ws-app-type">{/* {module.caption} */}</div>
      <div className="module-name ws-app-name">{module.caption}</div>
    </NavLink>
  );
}
