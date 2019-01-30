import React from "react";

interface NoMatchProps {}

class NoMatch extends React.Component<NoMatchProps> {
  render() {
    return (
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    );
  }
}

export default NoMatch;
