import React from "react";

import { IFormElement, IAction, KeyValue } from "../../interfaces";
import FormElement from "./FormElement";

interface FormProps {
  data: KeyValue<any>;
  schema: IFormElement[];
  onAction?: (action: IAction) => void;
  onChange?: (field: IFormElement, newValue: any) => void;
}

class Form extends React.Component<FormProps> {
  render() {
    return (
      <div className="form">
        <div className="form__container">
          <FormElement {...this.props} />
        </div>
      </div>
    );
  }
}

export default Form;
