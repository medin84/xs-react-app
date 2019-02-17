import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { apiService } from "../api/api.service";

import Form from "../components/form/Form";

interface KeyValue {
  [key: string]: any;
}

interface DocumentState {
  document: { data: KeyValue };
}

class DocumentContainer extends React.Component<
  RouteComponentProps,
  DocumentState
> {
  mounted: boolean = false;
  unlisten: any;

  componentDidMount() {
    this.mounted = true;
    this.unlisten = this.props.history.listen((location: any, action: any) => {
      if (this.props.location.pathname === location.pathname) {
        // console.log("Document::history.listen", location, this.props);
        this.fetchDocument(location);
      }
    });
    this.fetchDocument(this.props.history.location);
  }

  componentWillUnmount() {
    this.mounted = false;
    this.unlisten && this.unlisten();
    this.unlisten = null;
  }

  fetchDocument(location: any) {
    if (!this.mounted) {
      return;
    }

    console.log(this.props);

    // const params = new URLSearchParams(location.search);
    apiService.getDocument(location.search).then(response => {
      if (!this.mounted) {
        return;
      }

      this.setState({
        ...response
      });
    });
  }

  render() {
    if (!this.state || !this.state.document) {
      return null;
    }

    const { data } = this.state.document;
    const schema = [];
    for (let key in data) {
      schema.push({
        label: key,
        type: "string",
        field: key
      });
    }

    return <Form data={data} schema={schema} />;
  }
}

export default withRouter(DocumentContainer);
