import React from "react";
import { NavLink } from "react-router-dom";

import { INavEntry } from "../interfaces";

interface NavProps {
  path: string;
  items: INavEntry[];
}

interface NavState {
  toggle: boolean;
}

class Nav extends React.Component<NavProps, NavState> {
  state = {
    toggle: true
  };

  getIconClassName(item: any): any {
    return (
      "side-tree-toggle fa " +
      (item.children && item.children.length ? "" : "side-tree-toggle_holder")
    );
  }

  itemClass(item: INavEntry): string {
    return (
      (item.children && item.children.length ? "-collapsible " : "") +
      (item.expanded ? "" : "-collapsed ")
    );
  }

  toggleCollapsible(e: any, item: INavEntry) {
    e.preventDefault();
    item.expanded = !item.expanded;
    this.setState({ toggle: item.expanded });
  }

  renderNavLink(item: INavEntry) {
    return (
      <NavLink
        exact
        to={{ pathname: `${this.props.path}/views`, search: `${item.url}` }}
        className="nav-link"
        activeClassName="-active"
      >
        <i
          className={this.getIconClassName(item)}
          onClick={e => this.toggleCollapsible(e, item)}
        />
        <span className="nav-text">{item.caption}</span>
      </NavLink>
    );
  }

  renderNavHeader(item: INavEntry) {
    return (
      <div
        className="nav-header nav-link"
        onClick={e => this.toggleCollapsible(e, item)}
      >
        <i className={this.getIconClassName(item)} />
        <span className="nav-text">{item.caption}</span>
      </div>
    );
  }

  render() {
    if (!this.props.items || !this.props.items.length) {
      return null;
    }

    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.id} className={this.itemClass(item)}>
            {item.url ? this.renderNavLink(item) : this.renderNavHeader(item)}
            {item.children && item.children.length > 0 && (
              <Nav path={this.props.path} items={item.children} />
            )}
          </li>
        ))}
      </ul>
    );
  }
}

export default Nav;
