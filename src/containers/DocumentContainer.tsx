import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import axios from "axios";

import { apiService } from "../api/api.service";
import { doActionRequest } from "../api/api-action.service";
import { IApiDocumentResponse, IFormElement, IAction } from "../interfaces";
import Form from "../components/form/Form";
import { LoadSpinner } from "../components/LoadSpinner";

interface Props extends RouteComponentProps {
  embedded?: boolean;
  query?: string;
}

interface State {
  loading: boolean;
  data?: IApiDocumentResponse;
}

class DocumentContainer extends React.Component<Props, State> {
  historyListener: any;
  request: any;

  constructor(props: Props, state: State) {
    super(props, state);

    this.state = {
      loading: false
    };

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

    // doActionRequest(action.url);
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
      .getDocument(`?${params}`, { cancelToken: this.request.token })
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
      return (
        <div>
          [DocumentContainer configuration error] > when embedded "query" is
          required
        </div>
      );
    }

    const { loading, data } = this.state;
    if (loading && !data) {
      return <LoadSpinner />;
    }

    if (!data) {
      return null;
    }

    const { schema, document } = data;

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
