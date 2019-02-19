import React from "react";
import { connect } from "react-redux";
import { match, Route, RouteComponentProps, Switch } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";

import { IApplicationState } from "../interfaces";
import { URL_DOCUMENTS, URL_VIEWS } from "../constants/UrlConstants";
import { toggleSidenav } from "../actions/ui.actions";
import { logout } from "../actions/user.actions";
import Navbar from "../components/Navbar";
import NoMatch from "../components/NoMatch";
import Sidenav from "../components/Sidenav";
import DocumentContainer from "../containers/DocumentContainer";
import ViewContainer from "../containers/ViewContainer";

interface ModulePageRouteParams {
  moduleId: string;
}

interface ModuleProps
  extends IApplicationState,
    RouteComponentProps<ModulePageRouteParams> {
  match: match<any>;
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
    const { ui, history, match, onLogout } = this.props,
      moduleId = match.params.moduleId,
      navEntry = ui.sidenav.items.filter(it => it.id === moduleId);

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
                  <Switch>
                    <Route path={URL_DOCUMENTS} component={DocumentContainer} />
                    <Route path={URL_VIEWS} component={ViewContainer} />
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
