import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { match, Route, RouteComponentProps, Switch } from "react-router-dom";

import { IApplicationState, INavEntry } from "../interfaces";
import {
  URL_WS,
  URL_PROFILE,
  URL_DOCUMENT,
  URL_VIEW,
  URL_LOGIN
} from "../constants";
import {
  setModuleSwitcherVisible,
  setModuleSwitcherHidden,
  toggleSidenav,
  toggleCollapsibleSidenavEntry
} from "../actions/ui.actions";
import { logout } from "../actions/user.actions";
import { Navbar } from "../components/Navbar";
import { Sidenav } from "../components/Sidenav";
import UserProfile from "../components/UserProfile";
import { WorkspaceDbGrid } from "../components/WorkspaceDbGrid";
import DocumentContainer from "../containers/DocumentContainer";
import ViewContainer from "../containers/ViewContainer";
import LoginPage from "./LoginPage";
import Page404 from "./Page404";

interface WorkspaceProps extends IApplicationState, RouteComponentProps {
  dispatch: Dispatch;
  match: match<any>;
  onLogout: () => void;
  setModuleSwitcherVisible: () => void;
  setModuleSwitcherHidden: () => void;
  onSidenavToggle: () => void;
  onToggleCollapsibleSidenavEntry: (entry: INavEntry) => void;
}

class WorkspacePage extends React.Component<WorkspaceProps> {
  constructor(props: WorkspaceProps) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  getLayoutClassNames() {
    const { ui, location } = this.props;

    return (
      "app-root is-ready layout " +
      ui.theme +
      (location.pathname === URL_WS ? " workspace no-sidenav" : "") +
      (location.pathname === URL_PROFILE ? " no-sidenav" : "") +
      (ui.sidenav.open ? "" : " sidenav-toggled")
    );
  }

  handleLogout() {
    this.props.onLogout();
    this.props.history.push(URL_LOGIN);
  }

  render() {
    const {
      user,
      ui,
      history,
      location,
      setModuleSwitcherVisible,
      setModuleSwitcherHidden,
      onToggleCollapsibleSidenavEntry
    } = this.props;

    if (!user.isAuthenticated) {
      return <LoginPage {...this.props} />;
    }

    const params = new URLSearchParams(location.search),
      dbid = params.get("dbid") || "",
      navEntry = ui.sidenav.items.filter(it => it.id === dbid),
      hasNav = navEntry && navEntry.length > 0;

    return (
      <div className={this.getLayoutClassNames()}>
        <div className="layout__container">
          <Navbar {...this.props} onLogout={this.handleLogout} />
          <section className="main">
            <div className="main__container container">
              {hasNav && (
                <Sidenav
                  dbid={dbid}
                  navItems={navEntry}
                  expanded={ui.sidenav.expanded}
                  toggleCollapsible={onToggleCollapsibleSidenavEntry}
                />
              )}
              <main className="content">
                <div className="content__container">
                  <Switch>
                    <Route
                      exact
                      path={URL_WS}
                      render={() => (
                        <WorkspaceDbGrid modules={ui.sidenav.items} />
                      )}
                    />
                    <Route exact path={URL_PROFILE} component={UserProfile} />
                    <Route
                      exact
                      path={URL_DOCUMENT}
                      component={DocumentContainer}
                    />
                    <Route exact path={URL_VIEW} component={ViewContainer} />
                    <Route component={Page404} />
                  </Switch>
                </div>
              </main>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: WorkspaceProps) => {
  return {
    ...state
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onLogout: bindActionCreators(logout, dispatch),
    setModuleSwitcherVisible: bindActionCreators(
      setModuleSwitcherVisible,
      dispatch
    ),
    setModuleSwitcherHidden: bindActionCreators(
      setModuleSwitcherHidden,
      dispatch
    ),
    onSidenavToggle: bindActionCreators(toggleSidenav, dispatch),
    onToggleCollapsibleSidenavEntry: bindActionCreators(
      toggleCollapsibleSidenavEntry,
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkspacePage);
