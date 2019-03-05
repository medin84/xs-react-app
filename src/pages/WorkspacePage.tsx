import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

import { IApplicationState, INavEntry } from "../interfaces";
import {
  URL_WS,
  URL_PROFILE,
  URL_DOCUMENT,
  URL_VIEW,
  URL_LOGIN
} from "../constants";
import {
  setMobile,
  setModuleSwitcherVisible,
  setModuleSwitcherHidden,
  setSidenavOpen,
  setSidenavClose,
  toggleSidenav,
  toggleCollapsibleSidenavEntry
} from "../actions/ui.actions";
import { logout } from "../actions/user.actions";
import { isMobile } from "../utils";
import { Navbar } from "../components/Navbar";
import { Sidenav } from "../components/Sidenav";
import UserProfile from "../components/UserProfile";
import { WorkspaceDbGrid } from "../components/WorkspaceDbGrid";
import DocumentContainer from "../containers/DocumentContainer";
import ViewContainer from "../containers/ViewContainer";
import LoginPage from "./LoginPage";
import Page404 from "./Page404";

interface WorkspaceProps extends IApplicationState, RouteComponentProps {
  onLogout: () => void;
  setMobile: (isMobile: boolean) => void;
  setModuleSwitcherVisible: () => void;
  setModuleSwitcherHidden: () => void;
  setSidenavOpen: () => void;
  setSidenavClose: () => void;
  onSidenavToggle: () => void;
  onToggleCollapsibleSidenavEntry: (entry: INavEntry) => void;
}

class WorkspacePage extends React.Component<WorkspaceProps> {
  windowResizeTimer: any;
  historyListener: any;

  constructor(props: WorkspaceProps) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleToggleCollapsibleSidenavEntry = this.handleToggleCollapsibleSidenavEntry.bind(
      this
    );
    this.handleContentOverlayClick = this.handleContentOverlayClick.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowResize);

    this.historyListener = this.props.history.listen(location => {
      const { ui } = this.props;
      if (ui.isMobile && ui.sidenav.open) {
        this.props.setSidenavClose();
      }
    });
  }

  componentWillUnmount() {
    this.historyListener && this.historyListener();
    window.removeEventListener("resize", this.handleWindowResize);
  }

  getLayoutClassNames() {
    const { ui, location } = this.props;

    return (
      "app-root is-ready layout " +
      ui.theme +
      (ui.isMobile ? " phone" : "") +
      (location.pathname === URL_WS ? " workspace no-sidenav" : "") +
      (location.pathname === URL_PROFILE ? " no-sidenav" : "") +
      (ui.sidenav.open ? " sidenav-toggled" : " ") +
      (ui.isMobile && ui.sidenav.open ? " show-content-overlay" : "")
    );
  }

  handleLogout() {
    this.props.onLogout();
    this.props.history.push(URL_LOGIN);
  }

  handleToggleCollapsibleSidenavEntry(entry: INavEntry) {
    let cse = localStorage.getItem("CollapsibleSidenavEntries") || "";
    let result: string = cse;
    const entryIds = cse.split(",");
    if (entry.expanded) {
      entryIds.push(entry.id);
      result = entryIds.join(",");
    } else {
      const index = entryIds.indexOf(entry.id);
      if (index > -1) {
        entryIds.splice(index, 1);
        result = entryIds.join(",");
      }
    }
    localStorage.setItem("CollapsibleSidenavEntries", result);
  }

  handleContentOverlayClick(e: any) {
    if (this.props.ui.isMobile) {
      this.props.setSidenavClose();
    }
  }

  handleWindowResize(e: any) {
    clearTimeout(this.windowResizeTimer);
    this.windowResizeTimer = setTimeout(() => {
      this.props.setMobile(isMobile());
    }, 100);
  }

  render() {
    const { user, ui, location } = this.props;

    if (!user.isAuthenticated) {
      return <LoginPage {...this.props} />;
    }

    const params = new URLSearchParams(location.search),
      dbid = params.get("dbid") || "-",
      navEntry = ui.sidenav.items.filter(it => it.id === dbid),
      hasNav = navEntry && navEntry.length > 0;

    return (
      <div className={this.getLayoutClassNames()}>
        <div
          className="content__overlay"
          onMouseDown={this.handleContentOverlayClick}
          onTouchStart={this.handleContentOverlayClick}
        />
        <div className="layout__container">
          <Navbar {...this.props} onLogout={this.handleLogout} />
          <section className="main">
            <div className="main__container container">
              {hasNav && (
                <Sidenav
                  navItems={navEntry}
                  expanded={ui.sidenav.expanded}
                  toggleCollapsible={this.props.onToggleCollapsibleSidenavEntry}
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
    setMobile: bindActionCreators(setMobile, dispatch),
    setModuleSwitcherVisible: bindActionCreators(
      setModuleSwitcherVisible,
      dispatch
    ),
    setModuleSwitcherHidden: bindActionCreators(
      setModuleSwitcherHidden,
      dispatch
    ),
    onSidenavToggle: bindActionCreators(toggleSidenav, dispatch),
    setSidenavOpen: bindActionCreators(setSidenavOpen, dispatch),
    setSidenavClose: bindActionCreators(setSidenavClose, dispatch),
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
