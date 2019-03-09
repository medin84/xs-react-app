import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";

import config from "../config";
import { IApplicationState } from "../interfaces";
import { fetchSession } from "../actions/user.actions";
import { LoadSpinner } from "../components/LoadSpinner";
import WorkspacePage from "../pages/WorkspacePage";

interface Props extends IApplicationState {
  fetchSession: () => void;
}

interface State {
  loading: boolean;
}

class AppRouter extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { loading: true };
  }

  async componentDidMount() {
    await this.props.fetchSession();
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <LoadSpinner />;
    }

    return (
      <Router>
        <Switch>
          <Route path={config.URL_WS} component={WorkspacePage} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => {
  return {
    ...state
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    fetchSession: bindActionCreators(fetchSession, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppRouter);
