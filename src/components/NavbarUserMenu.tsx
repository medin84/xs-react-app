import React from "react";
import { Link } from "react-router-dom";

import { URL_PROFILE } from "../constants";
import { IUserState } from "../interfaces";

interface UserMenuProps {
  user: IUserState;
  i18n: {
    your_profile: string;
    logout: string;
  };
  onLogout: () => void;
}

export function NavbarUserMenu(props: UserMenuProps) {
  const {
    user: { displayMailLink, mailLink, name },
    i18n,
    onLogout
  } = props;

  return (
    <>
      {displayMailLink && (
        <div className="nav-item">
          <a
            className="nav-link"
            href={mailLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-inbox" />
          </a>
        </div>
      )}
      <div className="nav-item dropdown to-left">
        <button className="dropdown-toggle no-arrow user-menu">
          <span className="icon-user">
            <i className="fa fa-user" />
          </span>
          <span className="navbar-user-name">{name}</span>
        </button>
        <div className="dropdown-menu">
          <ul className="list user-menu-list">
            <li>
              <Link to={URL_PROFILE} className="list__item user-profile">
                <i className="list__item_icon fa fa-user-circle-o" />
                <div className="list__item_content">
                  {i18n.your_profile}
                  <div className="text-muted">{name}</div>
                </div>
              </Link>
            </li>
            <li className="list__item_divider" />
            <li>
              <button
                type="button"
                className="list__item w-100"
                onClick={onLogout}
              >
                <i className="list__item_icon fa fa-sign-out" />
                <div className="list__item_content text-left">
                  {i18n.logout}
                </div>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
