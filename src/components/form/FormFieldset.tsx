import React from "react";

import { IFormElement } from "../../interfaces";

interface FieldsetProps {
  schema: IFormElement;
}

interface FieldsetState {
  expanded: boolean;
}

class FormFieldset extends React.Component<FieldsetProps, FieldsetState> {
  constructor(props: FieldsetProps, state: FieldsetState) {
    super(props, state);

    this.state = { expanded: true };

    this.handleToggleExpanded = this.handleToggleExpanded.bind(this);
  }

  handleToggleExpanded() {
    this.setState(state => ({
      expanded: !state.expanded
    }));
  }

  render() {
    const {
      schema: { title, hint, className },
      children
    } = this.props;
    const { expanded } = this.state;

    return (
      <div className={`fieldset ${className ? className : ""}`}>
        {title && (
          <div
            className="fieldset__legend legend"
            title={hint}
            onClick={this.handleToggleExpanded}
          >
            {title}
          </div>
        )}
        <div className={`fieldset__body ${expanded ? "" : "hidden"}`}>
          {children}
        </div>
      </div>
    );
  }
}

export default FormFieldset;
