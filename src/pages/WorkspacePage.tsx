import React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { Route, RouteComponentProps } from "react-router-dom";

import { IApplicationState } from "../interfaces";
import { logout } from "../actions/user.actions";
import { toggleSidenav } from "../actions/ui.actions";
import Navbar from "../components/Navbar";
import ModuleList from "../components/ModuleList";
import UserProfile from "../components/UserProfile";

interface WorkspaceProps extends IApplicationState, RouteComponentProps {
  onLogout: (history: any) => void;
  onSidenavToggle: () => void;
}

class WorkspacePage extends React.Component<WorkspaceProps> {
  getLayoutClassNames() {
    const { ui } = this.props;

    return (
      "app-root is-ready layout workspace " +
      ui.theme +
      (ui.sidenav.open ? "" : " sidenav-toggled")
    );
  }

  render() {
    const { ui, history, match, onLogout } = this.props;

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
              <main className="content">
                <div className="content__container">
                  <Route
                    path={`${match.url}/`}
                    exact
                    render={() => {
                      return (
                        <div className="py-5">
                          <ModuleList
                            itemClassName="ws-app"
                            modules={ui.sidenav.items}
                          />
                        </div>
                      );
                    }}
                  />
                  <Route
                    path={`${match.url}/profile`}
                    exact
                    component={UserProfile}
                  />
                </div>
              </main>
            </div>
          </section>
        </div>
      </div>
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
    onLogout: bindActionCreators(logout, dispatch),
    onSidenavToggle: bindActionCreators(toggleSidenav, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkspacePage);
