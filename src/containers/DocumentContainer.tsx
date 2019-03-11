import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import axios from "axios";

import { IApiDocumentResponse, IFormElement, IAction } from "../interfaces";
import { apiService } from "../api/api.service";
import { assert } from "../utils";
import { FormElement } from "../components/form/FormElement";
import { Toolbar } from "../components/Toolbar";
import { LoadSpinner } from "../components/LoadSpinner";

interface Props extends RouteComponentProps {
  embedded?: boolean;
  query?: string;
}

interface State {
  loading: boolean;
  data: IApiDocumentResponse;
}

class DocumentContainer extends React.Component<Props, State> {
  historyListener: any;
  request: any;

  constructor(props: Props) {
    super(props);

    this.handleAction = this.handleAction.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (this.props.embedded) {
      if (this.props.query) {
        this.fetchDocument(new URLSearchParams(this.props.query));
      }
    } else {
      const { pathname, search } = this.props.location;
      this.fetchDocument(new URLSearchParams(search));

      this.historyListener = this.props.history.listen(location => {
        const isSamePath = pathname === location.pathname;
        if (isSamePath) {
          this.fetchDocument(new URLSearchParams(location.search));
        }
      });
    }
  }

  componentWillReceiveProps() {
    if (this.props.embedded && this.props.query) {
      this.fetchDocument(new URLSearchParams(this.props.query));
    }
  }

  componentWillUnmount() {
    this.historyListener && this.historyListener();
    this.request && this.request.cancel();
  }

  handleAction(action: IAction): void {
    console.log("handleAction", action);

    switch (action.type) {
      case "CLOSE":
      case "BACK":
        this.props.history.goBack();
        break;
      case "ACTION":
        apiService.doDocumentsActionRequest(
          action,
          [this.state.data.document],
          {}
        );
        break;
      default:
        break;
    }
  }

  handleChange(field: IFormElement, newValue: any): void {
    if (!this.state.data) {
      return;
    }

    if (field.name) {
      this.state.data.document[field.name] = newValue;
    }

    console.log("handleChange", field, newValue, this.state.data.document);
  }

  fetchDocument(params: URLSearchParams) {
    this.request && this.request.cancel();
    this.request = axios.CancelToken.source();

    this.setState({ loading: true });

    apiService
      .getDocument(params, { cancelToken: this.request.token })
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
    if (this.props.embedded && !this.props.query) {
      assert(
        false,
        `[DocumentContainer props] > when embedded "query" is required`,
        this.props
      );
    }

    if (!this.state) {
      return null;
    }

    const { loading, data } = this.state;
    if (loading && !data) {
      return <LoadSpinner />;
    }

    const { actions, schema, document } = data;

    return (
      <div className="form">
        <div className="form__container">
          {loading && <LoadSpinner />}
          {actions && (
            <div className="content-actions">
              <div className="content-actions__container">
                <Toolbar actions={actions} onAction={this.handleAction} />
              </div>
            </div>
          )}
          <FormElement
            data={document}
            schema={schema}
            onAction={this.handleAction}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(DocumentContainer);
