import React from "react";
import { withRouter, RouteComponentProps, Link, match } from "react-router-dom";
import { apiService } from "../api/api.service";

import View from "../components/view/View";

interface ModulePageRouteProps extends RouteComponentProps {
  moduleId: string;
  match: match<any>;
}

class ViewContainer extends React.Component<ModulePageRouteProps, any> {
  mounted: boolean = false;
  unlisten: any;

  componentDidMount() {
    this.mounted = true;
    this.unlisten = this.props.history.listen((location: any, action: any) => {
      if (this.props.location.pathname === location.pathname) {
        // console.log("View::history.listen", location, this.props);
        this.fetchView(location);
      }
    });
    this.fetchView(this.props.history.location);
  }

  componentWillUnmount() {
    this.mounted = false;
    this.unlisten && this.unlisten();
    this.unlisten = null;
  }

  fetchView(location: any) {
    if (!this.mounted) {
      return;
    }

    const params = new URLSearchParams(location.search);
    apiService.getViewEntries(location.search).then(response => {
      if (!this.mounted) {
        return;
      }

      this.setState({
        json: response
      });
    });
  }

  getDb(item: any) {
    // /SmartDoc_MunaiTelecom/SmartDoc/incoming.nsf/api/data/documents/unid/52ECB8FD976350024625832000356C8D
    if (!item["@link"]) {
      return "";
    }
    const dbName = item["@link"].href.split("/api/data/documents/unid/")[0];
    return dbName;
  }

  render() {
    if (!this.mounted) {
      return null;
    }

    const {
      match: {
        params: { moduleId }
      }
    } = this.props;

    return (
      <View
        moduleId={moduleId}
        data={this.state.json.view.data}
        schema={this.state.json.view.schema}
      />
    );
  }
}

export default withRouter(ViewContainer);
