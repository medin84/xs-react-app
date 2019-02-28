import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { match, Route, RouteComponentProps, Switch } from "react-router-dom";

import { IApplicationState, INavEntry } from "../interfaces";
import {
  URL_WS,
  URL_PROFILE,
  URL_DOCUMENT,
  URL_VIEW
} from "../constants/UrlConstants";
import {
  toggleSidenav,
  toggleCollapsibleSidenavEntry
} from "../actions/ui.actions";
import { logout } from "../actions/user.actions";
import Navbar from "../components/Navbar";
import Sidenav from "../components/Sidenav";
import UserProfile from "../components/UserProfile";
import { WorkspaceDbGrid } from "../components/WorkspaceDbGrid";
import NoMatch from "../components/NoMatch";
import DocumentContainer from "../containers/DocumentContainer";
import ViewContainer from "../containers/ViewContainer";

interface WorkspaceProps extends IApplicationState, RouteComponentProps {
  match: match<any>;
  onLogout: (history: any) => void;
  onSidenavToggle: () => void;
  onToggleCollapsibleSidenavEntry: (entry: INavEntry) => void;
}

class WorkspacePage extends React.Component<WorkspaceProps> {
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

  render() {
    const {
      ui,
      history,
      location,
      onLogout,
      onToggleCollapsibleSidenavEntry
    } = this.props;

    const params = new URLSearchParams(location.search),
      dbid = params.get("dbid"),
      navEntry = ui.sidenav.items.filter(
        it => it.id === `${URL_VIEW}?dbid=${dbid}`
      ),
      hasNav = navEntry && navEntry.length > 0;

    return (
      <div className={this.getLayoutClassNames()}>
        <div className="layout__container">
          <Navbar
            {...this.props}
            onLogout={() => {
              onLogout(history);
            }}
          />
          <section className="main">
            <div className="main__container container">
              {hasNav && (
                <Sidenav
                  dbid={dbid || ""}
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
                    <Route path={URL_DOCUMENT} component={DocumentContainer} />
                    <Route path={URL_VIEW} component={ViewContainer} />
                    <Route component={NoMatch} />
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
