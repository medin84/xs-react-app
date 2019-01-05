import { IApplicationState, IUIState, IUserState } from "../interfaces";

export default class StateService implements IApplicationState {
  ui: IUIState = {
    orgName: "",
    title: "",
    langs: [],
    logo: "",
    theme: "",
    sidenav: {
      open: true,
      gamburger: true,
      items: []
    }
  };

  user: IUserState = {
    isAuthenticated: true,
    name: "",
    token: "",
    theme: "",
    displayMailLink: false,
    mailLink: ""
  };

  uiToggleSidenav() {
    this.ui.sidenav.open = !this.ui.sidenav.open;
  }
}
