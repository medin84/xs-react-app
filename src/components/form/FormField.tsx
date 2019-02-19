import React from "react";

import { IFormElement, KeyValue } from "../../interfaces";

interface FormFieldProps {
  schema: IFormElement;
  data: KeyValue<any>;
  onChange?: (field: IFormElement, newValue: any) => void;
}

interface FormFieldState {
  value: any;
}

class FormField extends React.Component<FormFieldProps, FormFieldState> {
  constructor(props: FormFieldProps, state: FormFieldState) {
    super(props, state);

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      value: JSON.stringify(this.props.data[this.props.schema.name || ""])
    });
  }

  handleInputChange(e: any): void {
    this.props.onChange &&
      this.props.onChange(this.props.schema, e.target.value);
    this.setState({
      value: e.target.value
    });
  }

  renderReadOnly(schema: IFormElement) {
    return <div className="input-placeholder">{this.state.value}</div>;
  }

  renderInput(schema: IFormElement) {
    try {
      const { value } = this.state;
      return (
        <input
          type={schema.type}
          className={`input ${schema.className || ""}`}
          name={schema.name}
          value={value}
          autoComplete="off"
          onChange={this.handleInputChange}
        />
      );
    } catch (e) {
      console.log("renderInput::error");
      return <div>{JSON.stringify(e)}</div>;
    }
  }

  render() {
    if (!this.state) {
      return null;
    }

    const { schema, data, children } = this.props;
    let inputElement;
    if (schema.readOnly || schema.disabled) {
      inputElement = this.renderReadOnly(schema);
    } else {
      inputElement = this.renderInput(schema);
    }

    return (
      <div className="form-group">
        <div className="form-group__label control-label">{schema.title}</div>
        <div className="form-group__controls controls">
          {inputElement}
          {children}
        </div>
      </div>
    );
  }
}

export default FormField;
