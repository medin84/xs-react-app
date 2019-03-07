import React from "react";

import { IFormElement, IAction, KeyValue } from "../../interfaces";
import Fieldset from "./FormFieldset";
import FormField from "./FormField";
import Toolbar from "../Toolbar";

interface FormProps {
  data: KeyValue<any>;
  schema: IFormElement[];
  onAction: (action: IAction) => void;
  onChange?: (field: IFormElement, newValue: any) => void;
}

interface FormState {
  data: KeyValue<any>;
}

class FormElement extends React.Component<FormProps, FormState> {
  renderActions(element: IFormElement) {
    return (
      <div className={element.className}>
        <Toolbar
          actions={element.actions || []}
          onAction={this.props.onAction}
        />
      </div>
    );
  }

  renderBlock(element: IFormElement) {
    return (
      <div className={element.className}>
        {element.title}
        {element.children && (
          <FormElement {...this.props} schema={element.children} />
        )}
      </div>
    );
  }

  renderTabs(element: IFormElement) {
    return (
      <div className="tabs-root">
        <FormElement {...this.props} schema={element.children || []} />
      </div>
    );
  }

  renderTab(element: IFormElement) {
    return (
      <Fieldset schema={element}>
        {element.children && (
          <FormElement {...this.props} schema={element.children} />
        )}
      </Fieldset>
    );
  }

  renderFieldset(element: IFormElement) {
    return (
      <Fieldset schema={element}>
        {element.children && (
          <FormElement {...this.props} schema={element.children} />
        )}
      </Fieldset>
    );
  }

  renderField(element: IFormElement) {
    return (
      <FormField {...this.props} schema={element}>
        {element.children && (
          <FormElement {...this.props} schema={element.children} />
        )}
      </FormField>
    );
  }

  render() {
    const { schema } = this.props;

    return (
      <>
        {schema.map(item => {
          switch (item.type) {
            case "actions":
              return this.renderActions(item);

            case "block":
              return this.renderBlock(item);

            case "tabs":
              return this.renderTabs(item);

            case "tab":
              return this.renderTab(item);

            case "fieldset":
              return this.renderFieldset(item);

            case "text":
            case "list":
            case "date":
            case "datetime":
            case "richtext":
              return this.renderField(item);
          }
        })}
      </>
    );
  }
}

export default FormElement;
