import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import { IApplicationState } from "../interfaces";
import AppService from "../services/app.service";

import Navbar from "../components/Navbar";
import Sidenav from "../components/Sidenav";
import View from "../components/View";
import Login, { LoginState } from "../components/Login";
import UserProfile from "../components/UserProfile";
import NoMatch from "../components/NoMatch";

const Index = () => <h2>Home</h2>;

interface RouterProps {
  appService: AppService;
}

interface RouterState {
  loading: boolean;
  toggle: boolean;
}

class AppRouter extends React.Component<RouterProps, RouterState> {
  state: RouterState = {
    loading: true,
    toggle: true
  };

  constructor(props: RouterProps) {
    super(props);

    this.emitChange = this.emitChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSidenavToggle = this.handleSidenavToggle.bind(this);
  }

  componentDidMount() {
    // this.props.dispatch && userActions.getSession()(this.props.dispatch);
    this.props.appService
      .fetchSession()
      .then(resp => {
        this.props.appService.state.ui = resp.ui;
        this.props.appService.state.user = resp.user;

        this.setState({
          loading: false
        });
      })
      .catch(err => {
        this.setState({
          loading: false
        });
      });
  }

  emitChange() {
    this.setState(state => ({
      toggle: !state.toggle
    }));
  }

  handleLoginSubmit(credentials: LoginState) {
    this.props.appService.login(credentials).then(this.emitChange);
  }

  handleLogout() {
    this.props.appService.logout().then(this.emitChange);
  }

  handleSidenavToggle() {
    this.props.appService.state.uiToggleSidenav();
    this.emitChange();
  }

  // login = () => {
  //   this.props.dispatch &&
  //     userActions.login("medin", "pwd", false)(this.props.dispatch);
  //   // this.props.dispatch(userActions.logout());
  // };

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    const { ui, user } = this.props.appService.state;

    if (!user.isAuthenticated) {
      return <Login title="" logo="" onSubmit={this.handleLoginSubmit} />;
    }

    return (
      <Router>
        <div
          className={
            "app-root is-ready layout " +
            ui.theme +
            (ui.sidenav.open ? "" : " sidenav-toggled")
          }
        >
          <div className="layout__container">
            <Navbar
              ui={ui}
              user={user}
              onSidenavToggle={this.handleSidenavToggle}
              onLogout={this.handleLogout}
            />
            <section className="main">
              <div className="main__container container">
                <Sidenav navItems={ui.sidenav.items} />
                <main className="content">
                  <div className="content__container">
                    <Switch>
                      <Route path="/" exact component={Index} />
                      <Route path="/profile" component={UserProfile} />
                      <Route path="/views" component={View} />
                      <Route component={NoMatch} />
                    </Switch>
                  </div>
                </main>
              </div>
            </section>
          </div>
        </div>
      </Router>
    );
  }
}

export default AppRouter;
