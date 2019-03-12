import React from "react";

import { IFormElement, IDocument } from "../../interfaces";

interface Props {
  schema: IFormElement;
  data: IDocument;
  onChange?: (field: IFormElement, newValue: any) => void;
}

interface State {
  type: string;
  value: any;
}

export class FormField extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    const { schema, data } = this.props,
      _value = data[schema.name || "-"];
    let value,
      type = typeof _value as string;

    switch (type) {
      case "string":
      case "number":
        value = _value;
        break;

      case "object":
        if (_value.length) {
          value = _value;
          type = "array";
        } else {
          value = _value["data"];
          type = _value["type"];
        }
        break;
    }

    this.setState({ value, type });
  }

  handleInputChange(e: any): void {
    const { schema, onChange } = this.props;
    onChange && onChange(schema, e.target.value);
    this.setState({
      value: e.target.value
    });
  }

  renderReadOnly() {
    return <div className="input-placeholder">{this.state.value}</div>;
  }

  renderInput() {
    const { schema } = this.props;
    const { type, value } = this.state;

    try {
      return (
        <input
          type={type}
          className={`input ${schema.className || ""}`}
          name={schema.name}
          value={value}
          autoComplete="off"
          onChange={this.handleInputChange}
        />
      );
    } catch (e) {
      return <div>{JSON.stringify(schema)}</div>;
    }
  }

  render() {
    if (!this.state) {
      return null;
    }

    const { schema, children } = this.props;
    let inputElement;
    if (schema.readOnly || schema.disabled) {
      inputElement = this.renderReadOnly();
    } else {
      inputElement = this.renderInput();
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
