import React from "react";

interface KeyValue {
  [key: string]: any;
}

interface SchemaField {
  type: string;
  label: string;
  field: string;
}

interface FormProps {
  data: KeyValue;
  schema: SchemaField[];
  onAction?: () => void;
}

interface FormState {
  data: KeyValue;
}

class Form extends React.Component<FormProps, FormState> {
  render() {
    const { data, schema } = this.props;

    return (
      <div className="form">
        <div className="form__container">
          {schema.map(item => {
            return (
              <div className="form-group">
                <div className="control-label">{item.label}</div>
                <div className="controls">
                  {JSON.stringify(data[item.field])}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Form;
