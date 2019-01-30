import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";

import { fetchSession } from "../actions/user.actions";
import { IApplicationState } from "../interfaces";
import WorkspacePage from "../pages/WorkspacePage";
import ModulePage from "../pages/ModulePage";
import LoginPage from "../pages/LoginPage";
import NoMatch from "../components/NoMatch";

interface AppRouterProps {
  fetchSession: () => void;
}

class AppRouter extends React.Component<AppRouterProps> {
  componentDidMount() {
    this.props.fetchSession();
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/ws" component={WorkspacePage} />
          <Route path="/bd/:moduleId" component={ModulePage} />
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
