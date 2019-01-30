import React from "react";
import { Provider } from "react-redux";

import AppRouter from "./router/Router";
import configureStore from "./store/configureStore";

import "./nb.min.css";
import "./components/styles/Nav.css";

class App extends React.Component {
  render() {
    return (
      <Provider store={configureStore({})}>
        <AppRouter />
      </Provider>
    );
  }
}

export default App;
