import React from "react";

import { IAction } from "../interfaces";
import { Dropdown } from "./dropdown";

interface Props {
  actions: IAction[];
  onAction: (action: IAction) => void;
}

function ActionButton(props: {
  action: IAction;
  onClick: (action: IAction) => void;
}): React.ReactElement {
  return (
    <button
      type="button"
      className={`btn b-toolbar__btn ${
        props.action.primary ? "btn-primary" : ""
      } ${props.action.disabled ? "disabled" : ""}`}
      disabled={props.action.disabled}
      onClick={() => props.onClick(props.action)}
    >
      {props.action.icon && (
        <i className={`btn-icon b-toolbar__btn_icon ${props.action.icon}`} />
      )}
      {props.action.caption && (
        <span className="btn-label b-toolbar__btn_label">
          {props.action.caption}
        </span>
      )}
    </button>
  );
}

function DropdownToolbarActions(props: Props): React.ReactElement {
  return (
    <Dropdown className="b-toolbar__item b-toolbar__dropdown">
      <div className="dropdown-toggle b-toolbar__dropdown_toggle">
        <span className="b-toolbar__dropdown_toggle_label">...</span>
        <i className="b-toolbar__dropdown_toggle_icon" />
      </div>
      <ul className="dropdown-menu b-toolbar__dropdown_menu">
        {props.actions.map(action => {
          return (
            <li className="b-toolbar__item">
              <ActionButton
                action={action}
                onClick={() => props.onAction(action)}
              />
            </li>
          );
        })}
      </ul>
    </Dropdown>
  );
}

export class Toolbar extends React.Component<Props> {
  // const { navItems, expanded, toggleCollapsible } = props;

  render() {
    const inlineActions: IAction[] = this.props.actions,
      dropdownActions: IAction[] = [],
      onAction = this.props.onAction;

    return (
      <div className="nb-toolbar b-toolbar">
        <div className="nb-toolbar__container">
          {inlineActions.map(action => {
            return (
              <div className="b-toolbar__item">
                <ActionButton
                  action={action}
                  onClick={() => onAction(action)}
                />
              </div>
            );
          })}
          {dropdownActions.length > 0 && (
            <DropdownToolbarActions
              actions={dropdownActions}
              onAction={onAction}
            />
          )}
        </div>
      </div>
    );
  }
}
