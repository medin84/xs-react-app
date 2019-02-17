import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

class NoMatch extends React.Component<RouteComponentProps> {
  render() {
    console.log("NoMatch", this.props);
    const {
      location: { pathname, search }
    } = this.props;
    return (
      <h3>
        No match for{" "}
        <code>
          {pathname}
          {search}
        </code>
      </h3>
    );
  }
}

export default withRouter(NoMatch);
