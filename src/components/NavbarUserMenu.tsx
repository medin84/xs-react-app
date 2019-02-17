import React from "react";
import { RouteComponentProps, Link, match } from "react-router-dom";

import { URL_PROFILE } from "../constants/UrlConstants";
import { IUserState } from "../interfaces";

interface UserMenuProps extends RouteComponentProps {
  match: match<any>;
  user: IUserState;
  onLogout: () => void;
}

class NavbarUserMenu extends React.Component<UserMenuProps> {
  render() {
    const {
      user: { displayMailLink, mailLink, name },
      onLogout
    } = this.props;

    return (
      <nav className="navbar-nav">
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
                <Link
                  to={{ pathname: URL_PROFILE }}
                  className="list__item user-profile"
                >
                  <i className="list__item_icon fa fa-user-circle-o" />
                  <div className="list__item_content">
                    your_profile
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
                  <div className="list__item_content">logout</div>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavbarUserMenu;
