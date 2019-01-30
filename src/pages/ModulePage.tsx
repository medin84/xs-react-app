import React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { Route, RouteComponentProps } from "react-router-dom";

import { IApplicationState } from "../interfaces";
import { logout } from "../actions/user.actions";
import { toggleSidenav } from "../actions/ui.actions";
import Navbar from "../components/Navbar";
import Sidenav from "../components/Sidenav";
import View from "../components/View";

interface ModulePageRouteParams {
  moduleId: string;
}

interface ModuleProps
  extends IApplicationState,
    RouteComponentProps<ModulePageRouteParams> {
  onLogout: (history: any) => void;
  onSidenavToggle: () => void;
}

class ModulePage extends React.Component<ModuleProps> {
  getLayoutClassNames() {
    const { ui } = this.props;

    return (
      "app-root is-ready layout " +
      ui.theme +
      (ui.sidenav.open ? "" : " sidenav-toggled")
    );
  }

  render() {
    const { ui, history, match, onLogout } = this.props;
    const navEntry = ui.sidenav.items.filter(
      it => it.id === match.params.moduleId
    );

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
              <Sidenav path={match.url} navItems={navEntry} />
              <main className="content">
                <div className="content__container">
                  <Route path={`${match.url}/views`} component={View} />
                </div>
              </main>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: ModuleProps) => {
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
)(ModulePage);
