import React from "react";

import { IAction } from "../interfaces";
import { Dropdown } from "./dropdown";

interface Props {
  actions: IAction[];
  onAction: (action: IAction) => void;
}

interface State {
  actions: IAction[];
  popupActions: IAction[];
  containerWidth: number;
  width: number[];
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

function DropdownActions(props: Props): React.ReactElement {
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

export class ActionBar extends React.Component<Props, State> {
  ref: React.RefObject<HTMLDivElement>;
  timeout: any;

  constructor(props: Props) {
    super(props);

    this.state = {
      actions: props.actions,
      popupActions: [],
      containerWidth: 0,
      width: []
    };

    this.ref = React.createRef();
    this.handleWindowResize = this.handleWindowResize.bind(this);
  }

  componentDidMount() {
    this.calcActionsWidth();
    window.addEventListener("resize", this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
  }

  handleWindowResize() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.calcActionsWidth();
    }, 300);
  }

  calcActionsWidth() {
    if (!this.ref.current) {
      return;
    }

    const containerWidth = this.ref.current.getBoundingClientRect().width;
    let width: number[] = this.state.width;
    if (width.length === 0) {
      const buttons = this.ref.current.querySelectorAll(".b-toolbar__item"),
        _width: number[] = [];

      buttons.forEach(button => {
        const cs = window.getComputedStyle(button, null),
          ml = parseFloat(cs.getPropertyValue("margin-left")),
          mr = parseFloat(cs.getPropertyValue("margin-right")),
          rect = button.getBoundingClientRect();
        _width.push(rect.width + ml + mr);
      });
      width = _width;
    }

    let splitIndex = 0,
      aw = width[splitIndex];
    while (containerWidth >= aw) {
      aw += width[++splitIndex];
    }

    const { actions } = this.props;
    this.setState({
      actions: splitIndex >= 0 ? actions.slice(0, splitIndex) : actions,
      popupActions: splitIndex >= 0 ? actions.slice(splitIndex) : [],
      containerWidth: containerWidth,
      width: width
    });
  }

  render() {
    const { onAction } = this.props;
    const { actions, popupActions } = this.state;

    return (
      <div ref={this.ref} className="nb-toolbar b-toolbar">
        <div className="nb-toolbar__container">
          {actions.map(action => {
            return (
              <div className="b-toolbar__item">
                <ActionButton
                  action={action}
                  onClick={() => onAction(action)}
                />
              </div>
            );
          })}
          {popupActions.length > 0 && (
            <DropdownActions actions={popupActions} onAction={onAction} />
          )}
        </div>
      </div>
    );
  }
}
