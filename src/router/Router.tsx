import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";

import { URL_WS, URL_LOGIN, URL_MODULE } from "../constants/UrlConstants";
import { IApplicationState } from "../interfaces";
import { fetchSession } from "../actions/user.actions";
import { PrivateRoute } from "./PrivateRoute";
import WorkspacePage from "../pages/WorkspacePage";
import ModulePage from "../pages/ModulePage";
import LoginPage from "../pages/LoginPage";
import NoMatch from "../components/NoMatch";

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
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Redirect to={URL_WS} />} />
          <Route exact path={URL_LOGIN} component={LoginPage} />
          <PrivateRoute
            authenticated={user.isAuthenticated}
            redirectTo={URL_LOGIN}
            path={URL_WS}
            component={WorkspacePage}
          />
          <PrivateRoute
            authenticated={user.isAuthenticated}
            redirectTo={URL_LOGIN}
            path={URL_MODULE}
            component={ModulePage}
          />
          <Route component={NoMatch} />
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
