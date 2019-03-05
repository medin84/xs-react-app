import React from "react";
import { Provider } from "react-redux";

import AppRouter from "./router/Router";
import configureStore from "./store/configureStore";
import { loadState, saveState } from "./store/localeStorage";

import "./components/styles/Nav.css";

const store = configureStore(loadState());
store.subscribe(() => {
  saveState(store.getState());
});

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
  }
}

export default App;
