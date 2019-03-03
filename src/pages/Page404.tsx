import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

class Page404 extends React.PureComponent<RouteComponentProps> {
  render() {
    const {
      location: { pathname, search }
    } = this.props;

    return (
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          padding: "5%",
          fontSize: "2em"
        }}
      >
        <div>
          <h3>No match</h3>
          <code>
            {pathname}
            {search}
          </code>
        </div>
      </div>
    );
  }
}

export default withRouter(Page404);
