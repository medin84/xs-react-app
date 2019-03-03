import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";

import { URL_WS } from "../constants";
import { IApplicationState } from "../interfaces";
import { fetchSession } from "../actions/user.actions";
import WorkspacePage from "../pages/WorkspacePage";

interface AppRouterProps extends IApplicationState {
  fetchSession: () => void;
}

interface AppRouterState {
  loading: boolean;
}

class AppRouter extends React.Component<AppRouterProps, AppRouterState> {
  constructor(props: AppRouterProps, state: AppRouterState) {
    super(props, state);

    this.state = { loading: true };
  }

  async componentDidMount() {
    await this.props.fetchSession();
    this.setState({
      loading: false
    });
  }

  render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    const { user } = this.props;

    return (
      <HashRouter>
        <Switch>
          <Route path={URL_WS} component={WorkspacePage} />
        </Switch>
      </HashRouter>
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
