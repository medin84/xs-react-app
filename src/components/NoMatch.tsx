import React from "react";

interface NoMatchProps {}

interface NoMatchState {}

class NoMatch extends React.Component<NoMatchProps, NoMatchState> {
  onSubmit() {}

  render() {
    return (
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    );
  }
}

export default NoMatch;
