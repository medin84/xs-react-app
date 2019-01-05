import React from "react";

import AppService from "./services/app.service";
import AppRouter from "./router/Router";

import "./nb.min.css";
import "./components/styles/Nav.css";

class App extends React.Component {
  appService: AppService = new AppService();

  render() {
    return <AppRouter appService={this.appService} />;
  }
}

export default App;
