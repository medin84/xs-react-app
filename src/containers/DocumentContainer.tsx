import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import axios from "axios";

import { apiService } from "../api/api.service";
import { doActionRequest } from "../api/api-action.service";
import { IApiDocumentResponse, IFormElement, IAction } from "../interfaces";
import Form from "../components/form/Form";
import { LoadSpinner } from "../components/LoadSpinner";

interface DocumentState {
  loading: boolean;
  data: IApiDocumentResponse;
}

class DocumentContainer extends React.Component<
  RouteComponentProps,
  DocumentState
> {
  historyListener: any;
  request: any;

  constructor(props: any, state: DocumentState) {
    super(props, state);

    this.handleAction = this.handleAction.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.historyListener = this.props.history.listen(
      (location: any, action: string) => {
        if (this.props.location.pathname === location.pathname) {
          this.fetchDocument(location);
        }
      }
    );
    this.fetchDocument(this.props.history.location);
  }

  componentWillUnmount() {
    this.historyListener && this.historyListener();
    this.request && this.request.cancel();
  }

  handleAction(action: IAction): void {
    console.log("handleAction", action);

    // doActionRequest(action.url);
  }

  handleChange(field: IFormElement, newValue: any): void {
    if (field.name) {
      this.state.data.document[field.name] = newValue;
    }

    console.log("handleChange", field, newValue, this.state.data.document);
  }

  fetchDocument(location: any) {
    this.request && this.request.cancel();
    this.request = axios.CancelToken.source();

    this.setState(state => ({ ...state, loading: true }));

    // const params = new URLSearchParams(location.search);
    apiService
      .getDocument(location.search, { cancelToken: this.request.token })
      .then(response => {
        this.setState({ data: response.data, loading: false });
      })
      .catch(err => {
        if (!axios.isCancel(err)) {
          this.setState(state => ({ ...state, loading: false }));
        }
      });
  }

  render() {
    if (!this.state) {
      return null;
    } else if (this.state.loading && !this.state.data) {
      return <LoadSpinner />;
    }

    const { schema, document } = this.state.data;

    return (
      <>
        {this.state.loading && <LoadSpinner />}
        <Form
          data={document}
          schema={schema}
          onAction={this.handleAction}
          onChange={this.handleChange}
        />
      </>
    );
  }
}

export default withRouter(DocumentContainer);
