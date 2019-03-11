import React from "react";

import { IFormElement, IAction, IDocument } from "../../interfaces";
import { FormFieldset } from "./FormFieldset";
import { FormField } from "./FormField";
import { Toolbar } from "../Toolbar";

interface Props {
  data: IDocument<any>;
  schema: IFormElement[];
  onAction: (action: IAction) => void;
  onChange?: (field: IFormElement, newValue: any) => void;
}

interface State {
  data: IDocument<any>;
}

export class FormElement extends React.Component<Props, State> {
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
      <FormFieldset schema={element}>
        {element.children && (
          <FormElement {...this.props} schema={element.children} />
        )}
      </FormFieldset>
    );
  }

  renderFieldset(element: IFormElement) {
    return (
      <FormFieldset schema={element}>
        {element.children && (
          <FormElement {...this.props} schema={element.children} />
        )}
      </FormFieldset>
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
