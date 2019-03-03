import React from "react";
import { NavLink } from "react-router-dom";

import { INavEntry } from "../interfaces";
import { URL_WS, URL_VIEW } from "../constants";

export function ModuleLink(module: INavEntry) {
  let url;
  if (module.id === URL_WS) {
    url = URL_WS;
  } else {
    url = `${URL_VIEW}?dbid=${module.id}`;
  }

  return (
    <NavLink
      to={url}
      activeClassName="-active"
      className="module-link ws-app-link"
    >
      <span className="module-logo-wrap ws-app-logo">
        {module.icon && (
          <img className="module-logo" src={module.icon} alt={module.caption} />
        )}
      </span>
      <div className="module-type ws-app-type">{module.id}</div>
      <div className="module-name ws-app-name">{module.caption}</div>
    </NavLink>
  );
}
