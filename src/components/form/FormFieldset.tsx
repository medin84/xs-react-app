import React from "react";

import { IFormElement } from "../../interfaces";

interface FieldsetProps {
  schema: IFormElement;
}

class FormFieldset extends React.Component<FieldsetProps> {
  render() {
    const {
      schema: { title, hint, className },
      children
    } = this.props;

    return (
      <div className={`fieldset ${className ? className : ""}`}>
        {title && (
          <div className="fieldset__legend legend" title={hint}>
            {title}
          </div>
        )}
        <div className="fieldset__body">{children}</div>
      </div>
    );
  }
}

export default FormFieldset;
