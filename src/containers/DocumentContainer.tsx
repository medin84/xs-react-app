import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { apiService } from "../api/api.service";
import { doActionRequest } from "../api/api-action.service";
import { IFormElement, IAction, KeyValue } from "../interfaces";
import Form from "../components/form/Form";

interface DocumentState {
  document: KeyValue<any>;
  schema: IFormElement[];
}

class DocumentContainer extends React.Component<
  RouteComponentProps,
  DocumentState
> {
  unlisten: any;

  constructor(props: any, state: DocumentState) {
    super(props, state);

    this.handleAction = this.handleAction.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.unlisten = this.props.history.listen(
      (location: any, action: string) => {
        if (this.props.location.pathname === location.pathname) {
          this.fetchDocument(location);
        }
      }
    );
    this.fetchDocument(this.props.history.location);
  }

  componentWillUnmount() {
    this.unlisten && this.unlisten();
  }

  handleAction(action: IAction): void {
    console.log("handleAction", action);

    // doActionRequest(action.url);
  }

  handleChange(field: IFormElement, newValue: any): void {
    if (field.name) {
      this.state.document[field.name] = newValue;
    }

    console.log("handleChange", field, newValue, this.state.document);
  }

  fetchDocument(location: any) {
    // const params = new URLSearchParams(location.search);
    apiService.getDocument(location.search).then(response => {
      const { document } = response,
        formSchema = apiService.getFormSchema(document.data["@form"]);

      this.setState({
        document: document.data,
        schema: formSchema
      });
    });
  }

  render() {
    if (!this.state || !this.state.document) {
      return <div>Loading...</div>;
    }

    const { schema, document } = this.state;

    return (
      <Form
        data={document}
        schema={schema}
        onAction={this.handleAction}
        onChange={this.handleChange}
      />
    );
  }
}

export default withRouter(DocumentContainer);
